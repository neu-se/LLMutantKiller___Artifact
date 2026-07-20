import { parse } from '../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser';

describe('parse function', () => {
  it('should parse a URL and return an object with the expected properties', () => {
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
    expect(result.url).toBe("https://www.npmjs.com/package/electron-window-manager");
    expect(result.protocol).toBe("https:");
    expect(result.host).toBe("www.npmjs.com");
    expect(result.domain).toBe("npmjs.com");
    expect(result.subdomain).toBe("www");
    expect(result.path).toBe("/package/electron-window-manager");
    expect(result.search).toBe("");
    expect(result.querycount).toBe(0);
  });
});