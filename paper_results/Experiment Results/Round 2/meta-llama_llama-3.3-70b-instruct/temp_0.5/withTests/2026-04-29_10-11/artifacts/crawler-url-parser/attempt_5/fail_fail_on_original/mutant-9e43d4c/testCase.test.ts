import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
  it('should parse URL correctly', () => {
    const url = 'https://example.com/path?query#fragment';
    const parsedUrl = parse(url);
    expect(parsedUrl).toEqual({
      url: 'https://example.com/path?query',
      baseurl: null,
      protocol: 'http:',
      host: 'example.com',
      domain: 'example.com',
      subdomain: '',
      path: '/path',
      search: '?query',
      querycount: 1,
    });
  });
});