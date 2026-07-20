import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract deduplication with trailing slash URLs', () => {
  it('should treat URLs with and without trailing slash as distinct entries', () => {
    const html = `<html><body>
      <a href="http://www.example.com/page">link1</a>
      <a href="http://www.example.com/page/">link2</a>
    </body></html>`;
    
    const result = extract(html, "http://www.other.com/");
    // Both URLs should appear as separate entries since no normalization removes trailing slash
    const urls = result.map((r: any) => r.url);
    expect(urls).toContain("http://www.example.com/page");
    expect(urls).toContain("http://www.example.com/page/");
    expect(result.length).toBe(2);
  });
});