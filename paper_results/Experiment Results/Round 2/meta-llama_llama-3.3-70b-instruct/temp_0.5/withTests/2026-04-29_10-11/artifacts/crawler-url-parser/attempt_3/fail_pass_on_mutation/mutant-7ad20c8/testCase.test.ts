import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it('should not be executed when module is not the main module', () => {
    const originalConsoleLog = global.console.log;
    global.console.log = jest.fn();
    const url = "https://www.example.com";
    const result = parse(url);
    expect(global.console.log).not.toHaveBeenCalledWith("for testing purpose");
    global.console.log = originalConsoleLog;
  });
});