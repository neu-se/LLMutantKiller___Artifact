import { parse } from "../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
  it('should return an object with the expected properties when given a valid URL', () => {
    const url = "https://www.npmjs.com/package/electron-window-manager";
    const result = parse(url);
    expect(result).toHaveProperty('url');
    expect(result).toHaveProperty('baseurl');
    expect(result).toHaveProperty('protocol');
    expect(result).toHaveProperty('host');
    expect(result).toHaveProperty('domain');
    expect(result).toHaveProperty('subdomain');
    expect(result).toHaveProperty('path');
    expect(result).toHaveProperty('search');
    expect(result).toHaveProperty('querycount');
  });
});