import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it('should parse a URL correctly and the debugger should not be called', () => {
    const originalDebugger = global.debugger;
    global.debugger = jest.fn();
    const result = parse('https://www.npmjs.com/package/electron-window-manager');
    expect(result).toHaveProperty('url', 'https://www.npmjs.com/package/electron-window-manager');
    expect(result).toHaveProperty('protocol', 'https:');
    expect(result).toHaveProperty('host', 'www.npmjs.com');
    expect(global.debugger).not.toHaveBeenCalled();
    global.debugger = originalDebugger;
  });
});