import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('extract', () => {
  it('should correctly resolve relative URLs when source URL has query parameters', () => {
    const html = '<a href="page2">Link</a>';
    const result = extract(html, 'http://example.com/section/?filter=active');
    expect(result).toHaveLength(1);
    expect(result[0].url).toBe('http://example.com/section/page2');
  });
});