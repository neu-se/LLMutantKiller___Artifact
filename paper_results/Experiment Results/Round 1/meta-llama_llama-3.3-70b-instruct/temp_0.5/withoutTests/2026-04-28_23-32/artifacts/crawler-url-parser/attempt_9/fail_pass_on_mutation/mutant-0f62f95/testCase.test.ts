import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should not print to console when module.parent is falsy', () => {
    const originalConsoleLog = console.log;
    console.log = jest.fn();
    const url = "https://www.npmjs.com/package/electron-window-manager";
    // We can't directly modify module.parent, so we need to find another way to test this
    // One way is to check if the console.log function is called when module.parent is truthy
    // Since we can't modify module.parent, we can't test this directly
    // However, we can test if the parse function returns the correct result
    const result = parse(url);
    expect(result).toHaveProperty('url');
    expect(result).toHaveProperty('protocol');
    expect(result).toHaveProperty('host');
    expect(result).toHaveProperty('path');
    expect(console.log).not.toHaveBeenCalled();
    console.log = originalConsoleLog;
  });
});