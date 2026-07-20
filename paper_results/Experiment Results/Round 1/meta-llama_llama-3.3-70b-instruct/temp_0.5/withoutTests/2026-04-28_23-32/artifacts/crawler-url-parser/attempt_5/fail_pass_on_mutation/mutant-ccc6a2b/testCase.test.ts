import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js'

describe('crawler-url-parser', () => {
  it('should parse a URL and return an object, and when run as a standalone script, it should not throw an error', () => {
    const url = "https://www.npmjs.com/package/electron-window-manager";
    const result = parse(url);
    expect(result).not.toBeNull();
    expect(() => {
      const script = `
        const parse = require('../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js').parse;
        const url = "https ://www.npmjs.com/package/electron-window-manager";
        const res = parse(url);
      `;
      eval(script);
    }).not.toThrow();
  });
});