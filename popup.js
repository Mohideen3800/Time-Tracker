// Toggle the timer when the button is clicked
document.getElementById("toggle-button").addEventListener("click", function() {
  chrome.runtime.sendMessage({ type: "toggleTimer" });
});
