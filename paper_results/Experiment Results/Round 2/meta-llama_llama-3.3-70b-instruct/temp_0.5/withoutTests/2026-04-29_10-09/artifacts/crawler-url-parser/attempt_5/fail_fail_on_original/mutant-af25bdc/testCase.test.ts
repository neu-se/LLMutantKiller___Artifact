import { console } from 'console';
import { parse } from '../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should not log anything when console.log is called with an empty string', () => {
    const originalConsoleLog = console.log;
    let loggedMessage = '';

    console.log = (message) => {
      loggedMessage = message;
    };

    // Call the function that should log a message
    const data = '<html><body><script>console.log("for testing purpose");</script></body></html>';
    const sourceUrl = 'https://example.com';

    // Run the function
    const result = parse('https://example.com', sourceUrl);

    // Restore the original console.log function
    console.log = originalConsoleLog;

    // Check if the logged message is not empty
    expect(loggedMessage).not.toBe('');
  });
});