document.addEventListener("DOMContentLoaded", () => {
  const userCheckbox = document.getElementById("includeUserName");
  const timeCheckbox = document.getElementById("includeTimeStamp");
  const saveBtn = document.getElementById("saveBtn");

  // Load saved values
  chrome.storage.local.get(["includeUserName", "includeTimeStamp"], (data) => {
    userCheckbox.checked = data.includeUserName ?? false;
    timeCheckbox.checked = data.includeTimeStamp ?? false;
  });

  saveBtn.addEventListener("click", () => {
    const includeUserName = userCheckbox.checked;
    const includeTimeStamp = timeCheckbox.checked;

    // Save settings to storage
    chrome.storage.local.set({ includeUserName, includeTimeStamp }, () => {
      // Send a message to the content script in the active tab
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tabId = tabs[0]?.id; // Use optional chaining for safety
        if (tabId) {
          chrome.tabs.sendMessage(
            tabId,
            { action: "downloadChat" },
            (response) => {
              if (chrome.runtime.lastError) {
                // Handle potential errors, e.g., if content script isn't listening
                console.error(
                  "Error sending message to content script:",
                  chrome.runtime.lastError
                );
                // You might want to show a user-friendly error here
              } else if (response && response.status === "downloadStarted") {
                console.log("Download command sent successfully!");
              } else {
                console.log(
                  "No specific response from content script, or content script not ready."
                );
              }
              window.close(); // Close the popup after attempting to send the message
            }
          );
        } else {
          console.error("Could not find active tab ID.");
          window.close(); // Close popup even if no tab found
        }
      });
    });
  });
});
