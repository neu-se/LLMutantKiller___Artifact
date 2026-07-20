import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should not print to console when module.parent is falsy', () => {
    const originalConsoleLog = console.log;
    console.log = jest.fn();
    const url = "https://www.npmjs.com/package/electron-window-manager";
    parse(url);
    expect(console.log).not.toHaveBeenCalled();
    console.log = originalConsoleLog;
  });
});