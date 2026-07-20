import { parse } from "./crawler-url-parser.js";

describe('crawler-url-parser', () => {
  it('should not execute the console.log statement when the mutated code is used', () => {
    const originalConsoleLog = console.log;
    console.log = jest.fn();
    const url = "https://www.npmjs.com/package/electron-window-manager";
    const result = parse(url);
    expect(result).not.toBeNull();
    expect(result.url).toBe(url);
    expect(result.protocol).toBe('https:');
    expect(result.host).toBe('www.npmjs.com');
    expect(result.path).toBe('/package/electron-window-manager');
    expect(console.log).toHaveBeenCalledTimes(0);
    console.log = originalConsoleLog;
  });
});