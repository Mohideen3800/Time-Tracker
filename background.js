background.js:
// Set up the Google Sheets API client
const sheets = google.sheets({version: 'v4', auth});

// The ID of the Google Sheet
const sheetId = '1XK3z9T-Buat-tcixSfo6Owi52rE5veqHfy0cD7D6NqY';

// The range of cells to append the data to, in A1 notation
const range = 'Sheet1!A1';

// Listen for messages from the popup script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'timeTracked') {
    // Append the duration to the Google Sheet
    sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: range,
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      resource: {
        values: [[message.duration]],
      },
    }, (err, res) => {
      if (err) {
        // There was an error appending the data
        console.error(err);
      } else {
        // The data was successfully appended
        console.log(res);
      }
    });
  }
});
