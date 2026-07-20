import { console } from 'console';
import { parse } from './crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should log a message when the input URL is valid', () => {
    const originalConsoleLog = console.log;
    let loggedMessage = '';

    console.log = (message: string) => {
      loggedMessage = message;
    };

    const data = '<html><body><script>console.log("for testing purpose");</script></body></html>';
    const sourceUrl = 'https://example.com';

    parse('https://example.com', sourceUrl);

    expect(loggedMessage).toBe('for testing purpose');

    console.log = originalConsoleLog;
  });
});