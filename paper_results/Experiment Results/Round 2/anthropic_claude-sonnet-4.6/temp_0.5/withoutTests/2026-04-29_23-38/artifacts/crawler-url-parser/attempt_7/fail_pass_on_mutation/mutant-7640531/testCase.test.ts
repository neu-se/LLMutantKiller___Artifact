import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract', () => {
  it('should deduplicate URLs that differ only by fragment', () => {
    const html = `
      <a href="http://example.com/page#section1">link1</a>
      <a href="http://example.com/page#section2">link2</a>
    `;
    const result = extract(html, 'http://example.com/');
    // Both URLs should resolve to same URL after fragment stripping
    expect(result).toHaveLength(1);
    expect(result[0].url).toBe('http://example.com/page');
  });
});