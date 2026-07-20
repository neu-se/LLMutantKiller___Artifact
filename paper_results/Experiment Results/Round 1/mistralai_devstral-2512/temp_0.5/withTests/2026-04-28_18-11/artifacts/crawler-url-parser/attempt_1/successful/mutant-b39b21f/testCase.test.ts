import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function initialization test', () => {
  it('should initialize all properties of the result object', () => {
    const result = parse("http://example.com");
    expect(result).toHaveProperty('url');
    expect(result).toHaveProperty('baseurl');
    expect(result).toHaveProperty('protocol');
    expect(result).toHaveProperty('host');
    expect(result).toHaveProperty('domain');
    expect(result).toHaveProperty('subdomain');
    expect(result).toHaveProperty('path');
    expect(result).toHaveProperty('search');
    expect(result).toHaveProperty('querycount');
    expect(result.url).toBe('http://example.com/');
    expect(result.baseurl).toBeNull();
    expect(result.protocol).toBe('http:');
    expect(result.host).toBe('example.com');
    expect(result.domain).toBe('example.com');
    expect(result.subdomain).toBeNull();
    expect(result.path).toBe('/');
    expect(result.search).toBeNull();
    expect(result.querycount).toBe(0);
  });
});