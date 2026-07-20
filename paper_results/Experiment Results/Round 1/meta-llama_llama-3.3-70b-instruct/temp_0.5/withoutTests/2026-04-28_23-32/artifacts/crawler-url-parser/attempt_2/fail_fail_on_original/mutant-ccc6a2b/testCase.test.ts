import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js'

describe('crawler-url-parser', () => {
  it('should parse a URL and return an object with expected properties', () => {
    const url = "https://www.npmjs.com/package/electron-window-manager";
    const result = parse(url);
    expect(result).toHaveProperty('url', url);
    expect(result).toHaveProperty('baseurl', null);
    expect(result).toHaveProperty('protocol', 'https:');
    expect(result).toHaveProperty('host', 'www.npmjs.com');
    expect(result).toHaveProperty('domain', 'npmjs.com');
    expect(result).toHaveProperty('subdomain', 'www');
    expect(result).toHaveProperty('path', '/package/electron-window-manager');
    expect(result).toHaveProperty('search', '');
    expect(result).toHaveProperty('querycount', 0);
  });
});