import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should handle parsing of URLs correctly and not log to console', () => {
    const originalOutput = parse("https://www.npmjs.com/package/electron-window-manager");
    expect(originalOutput).not.toBeNull();
    const consoleLogSpy = jest.spyOn(console, 'log');
    parse("https://www.npmjs.com/package/electron-window-manager");
    expect(consoleLogSpy).not.toHaveBeenCalledWith("for testing purpose");
  });
});