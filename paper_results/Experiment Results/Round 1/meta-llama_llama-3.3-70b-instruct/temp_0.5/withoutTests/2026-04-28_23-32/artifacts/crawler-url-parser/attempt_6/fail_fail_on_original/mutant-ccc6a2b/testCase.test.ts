import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js'

describe('crawler-url-parser', () => {
  it('should parse a URL and return an object, and when run as a standalone script, it should log the result to the console', () => {
    const originalConsoleLog = console.log;
    const logSpy = jest.fn();
    console.log = logSpy;
    const script = `
      const parse = require('../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js').parse;
      const url = "https ://www.npmjs.com/package/electron-window-manager";
      const res = parse(url);
    `;
    const vm = require('vm');
    const context = vm.createContext();
    context.console = console;
    context.require = require;
    vm.runInContext(script, context);
    expect(logSpy).toHaveBeenCalledTimes(1); // the original code should log the result
    console.log = originalConsoleLog;
  });
});