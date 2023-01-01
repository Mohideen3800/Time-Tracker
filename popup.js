popup.js:
let startTime;
let endTime;

// When the toggle button is clicked
document.getElementById('toggle-button').addEventListener('click', function(event) {
  // If the timer is not currently running
  if (!startTime) {
    // Start the timer
    startTime = new Date();
  } else {
    // Stop the timer
    endTime = new Date();
    // Calculate the duration in seconds
    const duration = (endTime - startTime) / 1000;
    // Send a message to the background script with the duration
    chrome.runtime.sendMessage({type: 'timeTracked', duration: duration});
    // Reset the start time
    startTime = null;
  }
});
