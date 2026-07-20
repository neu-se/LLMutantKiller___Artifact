import { parse } from "../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
  it('should return an object with the expected properties when given a valid URL', () => {
    const url = "https://www.npmjs.com/package/electron-window-manager";
    const result = parse(url);
    expect(result).toHaveProperty('url', expect.any(String));
    expect(result).toHaveProperty('protocol', expect.any(String));
    expect(result).toHaveProperty('host', expect.any(String));
    expect(result).toHaveProperty('domain', expect.any(String));
    expect(result).toHaveProperty('subdomain', expect.any(String));
    expect(result).toHaveProperty('path', expect.any(String));
    expect(result).toHaveProperty('search', expect.any(String));
    expect(result).toHaveProperty('querycount', expect.any(Number));
    expect(result.url).not.toBeNull();
    expect(result.protocol).not.toBeNull();
    expect(result.host).not.toBeNull();
    expect(result.domain).not.toBeNull();
    expect(result.subdomain).not.toBeNull();
    expect(result.path).not.toBeNull();
    expect(result.search).not.toBeNull();
    expect(result.querycount).not.toBeNull();
    expect(Object.keys(result)).toHaveLength(9);
  });
});