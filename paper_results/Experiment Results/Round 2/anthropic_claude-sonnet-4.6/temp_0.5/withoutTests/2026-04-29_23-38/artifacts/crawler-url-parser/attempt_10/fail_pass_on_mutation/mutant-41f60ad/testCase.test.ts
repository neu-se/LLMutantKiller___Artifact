import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('extract', () => {
  it('should correctly exclude source URL with plus sign from results', () => {
    const sourceUrl = 'http://example.com/?q=hello+world';
    const html = `<a href="${sourceUrl}">self</a><a href="http://other.com/">other</a>`;
    const result = extract(html, sourceUrl);
    const urls = result.map(r => r.url);
    expect(urls).not.toContain(sourceUrl);
    expect(urls).toContain('http://other.com/');
  });
});