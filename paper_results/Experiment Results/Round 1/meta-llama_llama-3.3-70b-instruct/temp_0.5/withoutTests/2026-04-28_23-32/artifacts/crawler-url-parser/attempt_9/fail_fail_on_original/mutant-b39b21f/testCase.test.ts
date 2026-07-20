import { parse } from "../../../crawler-url-parser.js";

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
    expect(Object.keys(result)).toHaveLength(9);
    expect(Object.keys(result)).toEqual([
      'url',
      'baseurl',
      'protocol',
      'host',
      'domain',
      'subdomain',
      'path',
      'search',
      'querycount',
    ]);
    expect(result.url).not.toBeNull();
    expect(result.protocol).not.toBeNull();
    expect(result.host).not.toBeNull();
    expect(result.domain).not.toBeNull();
    expect(result.subdomain).not.toBeNull();
    expect(result.path).not.toBeNull();
    expect(result.search).not.toBeNull();
    expect(result.querycount).not.toBeNull();
  });
});