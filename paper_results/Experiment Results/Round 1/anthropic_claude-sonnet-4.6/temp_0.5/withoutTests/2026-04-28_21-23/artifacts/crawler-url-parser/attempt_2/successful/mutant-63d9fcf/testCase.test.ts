import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('extract', () => {
  it('should accumulate text from multiple links to the same URL when texts differ', () => {
    // Two links to same URL with different texts - original appends new text if not included
    // mutated would only append if already included (wrong behavior)
    const html = '<a href="http://example.com/page">First Text</a><a href="http://example.com/page">Second Text</a>';
    const sourceUrl = 'http://example.com/';
    const results = extract(html, sourceUrl);
    expect(results.length).toBe(1);
    const link = results.find((r: any) => r.url && r.url.includes('page'));
    expect(link).toBeDefined();
    expect(link.text).toContain('Second Text');
  });
});