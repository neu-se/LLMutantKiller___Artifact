import { parse } from "../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
  it('should return an object with the expected properties when given a valid URL', () => {
    const url = "https://www.npmjs.com/package/electron-window-manager";
    const result = parse(url);
    expect(result).toEqual(
      expect.objectContaining({
        url: expect.any(String),
        protocol: expect.any(String),
        host: expect.any(String),
        domain: expect.any(String),
        subdomain: expect.any(String),
        path: expect.any(String),
        search: expect.any(String),
        querycount: expect.any(Number),
      })
    );
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
  });
});