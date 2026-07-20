import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it('should parse a URL correctly and not enter the testing block', () => {
    const originalConsoleLog = console.log;
    console.log = jest.fn();
    const originalDebugger = global.debugger;
    global.debugger = jest.fn();
    const result = parse('https://www.npmjs.com/package/electron-window-manager');
    expect(result).toHaveProperty('url', 'https://www.npmjs.com/package/electron-window-manager');
    expect(result).toHaveProperty('protocol', 'https:');
    expect(result).toHaveProperty('host', 'www.npmjs.com');
    expect(console.log).toHaveBeenCalledTimes(0);
    expect(global.debugger).toHaveBeenCalledTimes(0);
    console.log = originalConsoleLog;
    global.debugger = originalDebugger;
  });
});