const fs = require('fs');
const path = require('path');

describe('crawler-url-parser', () => {
  it('should log a message when the input URL is valid', () => {
    const originalConsoleLog = console.log;
    let loggedMessage = '';

    console.log = (message: string) => {
      loggedMessage = message;
    };

    const filePath = path.join(__dirname, '../crawler-url-parser.js');
    require(filePath);

    expect(loggedMessage).toBe('for testing purpose');

    console.log = originalConsoleLog;
  });
});