import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract', () => {
  it('correctly resolves relative links when source URL has fragment', () => {
    const html = '<a href="page2.html">link</a>';
    const sourceUrl = 'http://example.com/dir/page1.html#section';
    const result = extract(html, sourceUrl);
    expect(result).toHaveLength(1);
    expect(result[0].url).toBe('http://example.com/dir/page2.html');
  });
});