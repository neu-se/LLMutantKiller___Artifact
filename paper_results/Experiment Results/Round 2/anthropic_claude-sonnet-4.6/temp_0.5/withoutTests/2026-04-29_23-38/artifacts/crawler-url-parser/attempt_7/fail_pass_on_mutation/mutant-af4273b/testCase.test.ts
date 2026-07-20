import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('extract', () => {
  it('should correctly extract and resolve relative URLs from HTML with query-bearing source URL', () => {
    const html = '<a href="about.html">About</a>';
    const result = extract(html, 'http://example.com/dir/?section=main');
    expect(result).toHaveLength(1);
    expect(result[0].url).toBe('http://example.com/dir/about.html');
    expect(result[0].type).toBe('sublevel');
  });
});