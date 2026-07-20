import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should handle parsing of URLs correctly and not throw an error', () => {
    const originalConsoleLog = console.log;
    console.log = jest.fn();
    expect(() => {
      parse("https://www.npmjs.com/package/electron-window-manager");
    }).not.toThrowError();
    console.log = originalConsoleLog;
  });
});