chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "downloadChat") {
    chrome.storage.local.get(
      ["includeUserName", "includeTimeStamp"],
      (settings) => {
        const includeUserName = settings.includeUserName ?? false;
        const includeTimeStamp = settings.includeTimeStamp ?? false;

        // Sanitize the filename: remove characters that are invalid in filenames
        const sanitizeFilename = (filename) => {
          let sanitized = filename.replace(/[\\/?%*:|"<> \x00-\x1F]/g, " ");
          return sanitized.substring(0, 100);
        };

        // Get current date (only date, no time)
        const getFileSafeDateOnly = () => {
          const now = new Date();
          const options = {
            timeZone: "Asia/Jerusalem",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          };
          const parts = now.toLocaleDateString("he-IL", options);
          const [day, month, year] = parts.split(".");
          return `${year}-${month}-${day}`;
        };

        // Get the topic and time from the header
        const topicSpan = document.querySelector(
          "header .header-left .header-info .recording-topic .topic"
        );
        const timeSpan = document.querySelector(
          "header .header-left .header-info .info-container .info-container-time"
        );
        const desiredFilename = topicSpan
          ? topicSpan.textContent.trim()
          : "ZCZ";
        const desiredFileDate = timeSpan
          ? timeSpan.textContent.trim()
          : getFileSafeDateOnly();
        const filename = `${sanitizeFilename(
          desiredFilename
        )} (${desiredFileDate}).text`;

        // Function to extract text from the chat and download it
        function extractAndDownload() {
          const listItems = document.querySelectorAll("li");
          let allExtractedText = "";

          listItems.forEach((item) => {
            let itemText = "";

            // Extract user name and timestamp if required
            if (includeUserName || includeTimeStamp) {
              const userNameSpan = item.querySelector(
                ".user-info .user-name-span"
              );
              const timeSpan = item.querySelector(".user-info .time");

              const userNameText = userNameSpan?.textContent.trim();
              const timeStampText = timeSpan?.textContent.trim();

              if (includeUserName && includeTimeStamp) {
                if (userNameText && timeStampText) {
                  itemText = `\n${userNameText} - ${timeStampText} :\n`;
                } else if (userNameText) {
                  itemText = `\n${userNameText} :\n`;
                } else if (timeStampText) {
                  itemText = `\n${timeStampText} :\n`;
                }
              } else if (includeUserName && userNameText) {
                itemText = `\n${userNameText} :\n`;
              } else if (includeTimeStamp && timeStampText) {
                itemText = `\n${timeStampText} :\n`;
              }
            }

            // Extract message text
            const textDiv = item.querySelector(".timeline .text");
            if (textDiv) {
              const theText = textDiv.textContent.trim();
              if (theText) {
                itemText += theText;
              }
            }

            if (itemText) {
              allExtractedText += itemText + "\n";
            }
          });

          const finalExtractedText = allExtractedText.trim();

          // Create a download link for the extracted text
          const doc = document.createElement("a");
          doc.download = filename;
          doc.href = URL.createObjectURL(
            new Blob([finalExtractedText], { type: "text/plain" })
          );

          document.body.appendChild(doc);
          doc.click();
          document.body.removeChild(doc);
          URL.revokeObjectURL(doc.href);

          console.log(`Initiating download: ${filename}`);
          console.log(finalExtractedText);
        }

        // Wait for the chat to load and then run the extraction
        function waitForChatAndRun(callback) {
          const alreadyLoaded = document.querySelector("li .timeline .text");
          if (alreadyLoaded) {
            callback();
            return;
          }

          const observer = new MutationObserver((_, obs) => {
            const ready = document.querySelector("li .timeline .text");
            if (ready) {
              obs.disconnect();
              callback();
            }
          });

          observer.observe(document.body, {
            childList: true,
            subtree: true,
          });
        }

        waitForChatAndRun(extractAndDownload);
        sendResponse({ status: "downloadStarted" });
      }
    );
    return true;
  }
});
