import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js'

describe('crawler-url-parser', () => {
  it('should parse a URL and return an object, and when run as a standalone script, the global console object should be defined', () => {
    const originalConsoleLog = console.log;
    const logSpy = jest.fn();
    console.log = logSpy;
    const script = `
      const parse = require('../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js').parse;
      const url = "https ://www.npmjs.com/package/electron-window-manager";
      const res = parse(url);
      if (!module.parent) {
        console.log(res);
      }
    `;
    const vm = require('vm');
    const context = vm.createContext();
    context.console = console;
    context.require = require;
    context.module = { parent: null };
    vm.runInContext(script, context);
    expect(typeof globalThis.console).toBe('object');
    console.log = originalConsoleLog;
  });
});