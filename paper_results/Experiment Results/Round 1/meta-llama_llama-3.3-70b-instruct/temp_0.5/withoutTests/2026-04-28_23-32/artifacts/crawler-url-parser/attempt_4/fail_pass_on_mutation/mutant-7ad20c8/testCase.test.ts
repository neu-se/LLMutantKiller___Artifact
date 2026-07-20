import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should handle parsing of URLs correctly and not enter the test block', () => {
    const consoleLogSpy = jest.spyOn(console, 'log');
    parse("https://www.npmjs.com/package/electron-window-manager");
    expect(consoleLogSpy).not.toHaveBeenCalledWith("for testing purpose");
    consoleLogSpy.mockRestore();
  });
});