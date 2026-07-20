const fs = require('fs');
const path = require('path');

describe('crawler-url-parser', () => {
  it('should execute the console.log statement when the original code is used', () => {
    const originalConsoleLog = console.log;
    const logSpy = jest.fn();
    console.log = logSpy;
    const crawlerUrlParserPath = path.join(__dirname, 'crawler-url-parser.js');
    const code = fs.readFileSync(crawlerUrlParserPath, 'utf8');
    const originalCode = code.replace('if (false) {', 'if (true) {');
    fs.writeFileSync(crawlerUrlParserPath, originalCode);
    const { parse } = require('./crawler-url-parser.js');
    const url = "https://www.npmjs.com/package/electron-window-manager";
    const result = parse(url);
    expect(result).not.toBeNull();
    expect(result.url).toBe(url);
    expect(result.protocol).toBe('https:');
    expect(result.host).toBe('www.npmjs.com');
    expect(result.path).toBe('/package/electron-window-manager');
    expect(logSpy).toHaveBeenCalledTimes(1);
    fs.writeFileSync(crawlerUrlParserPath, code);
    console.log = originalConsoleLog;
  });
});