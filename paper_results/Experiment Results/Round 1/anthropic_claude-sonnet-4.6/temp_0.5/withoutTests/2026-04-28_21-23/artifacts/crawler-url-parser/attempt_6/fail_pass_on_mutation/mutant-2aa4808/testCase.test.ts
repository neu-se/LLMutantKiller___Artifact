import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract', () => {
  it('should correctly extract and resolve URLs from HTML', () => {
    const html = `<html><body>
      <a href="subpage">link1</a>
      <a href="../other">link2</a>
    </body></html>`;
    const result = extract(html, 'http://example.com/section/page');
    const urls = result.map(r => r.url);
    expect(urls).toContain('http://example.com/section/subpage');
    expect(urls).toContain('http://example.com/other');
  });
});