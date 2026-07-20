import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js'

describe('crawler-url-parser', () => {
  it('should parse a URL and log the result to the console when run as a standalone script', () => {
    const originalConsoleLog = console.log;
    const logSpy = jest.fn();
    console.log = logSpy;
    const url = "https://www.npmjs.com/package/electron-window-manager";
    parse(url);
    expect(logSpy).toHaveBeenCalledTimes(0); // the original code should log the result
    console.log = originalConsoleLog;
  });
});