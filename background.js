// Replace YOUR_CLIENT_ID and YOUR_API_KEY with your own values
var clientId = "420794664142-bqpqhd4u9qomdnlsvfc5sfpr313sp9h8.apps.googleusercontent.com";
var apiKey = "AIzaSyANorXi76ZJy03GVTulOhDilgqqou_CXFI";

var discoveryDocs = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
gapi.load("client:auth2", function() {
  gapi.client.init({
    apiKey: apiKey,
    clientId: clientId,
    discoveryDocs: discoveryDocs,
    scope: "https://www.googleapis.com/auth/spreadsheets"
  });
});

// Replace YOUR_SPREADSHEET_ID with the ID of your Google Sheet
var spreadsheetId = "1XK3z9T-Buat-tcixSfo6Owi52rE5veqHfy0cD7D6NqY";

// Load the Google Sheets API
var discoveryDocs = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
gapi.load("client:auth2", function() {
  gapi.client.init({
    apiKey: apiKey,
    clientId: clientId,
    discoveryDocs: discoveryDocs,
    scope: "https://www.googleapis.com/auth/spreadsheets"
  }).then(function() {
    // Authorize the extension to access the sheet
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignInStatus);
    updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
  });
});

function updateSignInStatus(isSignedIn) {
  if (isSignedIn) {
    // The extension is now authorized to access the sheet
  }
}

// Flag to track whether the timer is running
var timerRunning = false;

// Start and end times
var startTime;
var endTime;

// Set up an alarm to trigger every minute
chrome.alarms.create("updateTimer", { periodInMinutes: 1 });

// Add an event listener to handle the alarm
chrome.alarms.onAlarm.addListener(function(alarm) {
  if (alarm.name === "updateTimer" && timerRunning) {
    // The timer is running, so update the Google Sheet with the duration data
    updateSheet();
  }
});

// Toggle the timer when the button is clicked
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.type === "toggleTimer") {
    if (!timerRunning) {
      // Start the timer
      timerRunning = true;
      startTime = new Date();
    } else {
      // Stop the timer
      timerRunning = false;
      endTime = new Date();
    }
  }
});

function updateSheet() {
  // Calculate the duration in minutes
  var duration = (Date.now() - startTime) / (1000 * 60);

  // Write the duration to the Google Sheet
  gapi.client.sheets.spreadsheets.values.append({
    spreadsheetId: spreadsheetId,
    range: "Sheet1!D2",  // Update the "Duration" column in the second row
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    resource: {
      values: [[duration]]
    }
  }).then(function(response) {
    console.log("Duration updated in the Google Sheet.");
  });
}
