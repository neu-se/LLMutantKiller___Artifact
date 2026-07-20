import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract should filter out short href values', () => {
  it('should not include links with href shorter than 3 characters', () => {
    const html = `
      <html>
        <body>
          <a href="ab">short link</a>
          <a href="http://www.example.com/valid-link">valid link</a>
        </body>
      </html>
    `;
    const result = extract(html, 'http://www.example.com/');
    const urls = result.map((r: { url: string }) => r.url);
    // A link with href "ab" (length < 3) should be filtered out
    // Only the valid link should be present
    expect(result.length).toBe(1);
    expect(urls[0]).toContain('valid-link');
  });
});