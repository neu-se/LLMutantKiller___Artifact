import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it('should return an object with a url property when called with a valid URL', () => {
    const originalConsoleLog = console.log;
    console.log = jest.fn();
    const url = 'https://www.npmjs.com/package/electron-window-manager';
    const result = parse(url);
    expect(result).toHaveProperty('url');
    expect(result.url).toBe('https://www.npmjs.com/package/electron-window-manager');
    expect(console.log).toHaveBeenCalledTimes(0);
    console.log = originalConsoleLog;
  });
});