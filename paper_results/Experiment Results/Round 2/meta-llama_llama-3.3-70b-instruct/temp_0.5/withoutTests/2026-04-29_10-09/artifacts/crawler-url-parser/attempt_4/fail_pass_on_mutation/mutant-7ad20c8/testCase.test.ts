import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it('should not log anything to the console when imported as a module', () => {
    const originalConsoleLog = console.log;
    console.log = jest.fn();
    parse('https://www.npmjs.com/package/electron-window-manager');
    expect(console.log).not.toHaveBeenCalled();
    console.log = originalConsoleLog;
  });
});