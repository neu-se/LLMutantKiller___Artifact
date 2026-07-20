import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should handle parsing of URLs correctly and not log to console', () => {
    const originalConsoleLog = console.log;
    console.log = jest.fn();
    parse("https://www.npmjs.com/package/electron-window-manager");
    expect(console.log).not.toHaveBeenCalledWith("for testing purpose");
    console.log = originalConsoleLog;
  });
});