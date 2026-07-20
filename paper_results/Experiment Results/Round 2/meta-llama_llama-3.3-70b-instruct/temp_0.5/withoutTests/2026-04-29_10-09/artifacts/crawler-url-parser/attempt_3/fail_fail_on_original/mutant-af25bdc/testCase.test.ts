import { extract } from "../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('crawler-url-parser', () => {
  it('should log a message when the console.log function is called with a non-empty string', () => {
    const originalConsoleLog = console.log;
    let loggedMessage = '';

    console.log = (message) => {
      loggedMessage = message;
    };

    const data = '<html><body><script>console.log("for testing purpose");</script></body></html>';
    const sourceUrl = 'https://example.com';

    extract(data, sourceUrl);

    expect(loggedMessage).toBe('for testing purpose');

    console.log = originalConsoleLog;
  });
});