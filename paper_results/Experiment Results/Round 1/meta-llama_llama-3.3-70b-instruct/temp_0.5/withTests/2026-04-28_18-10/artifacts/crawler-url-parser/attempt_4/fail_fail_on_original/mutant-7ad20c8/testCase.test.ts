import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it('should pass on the original code and fail on the mutated code', () => {
    const url = 'https ://www.npmjs.com/package/electron-window-manager';
    const result = parse(url);
    expect(result).not.toBeNull();
    expect(result.url).toBe('https://www.npmjs.com/package/electron-window-manager');
    // In the original code, the debugger statement will not be executed when the module is imported.
    // In the mutated code, the debugger statement will always be executed.
    // So, this test case should pass on the original code and fail on the mutated code.
    expect(process.env.NODE_ENV).not.toBe('debug');
  });
});