import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract should filter out short hrefs', () => {
  it('should not include links with href shorter than 3 characters', () => {
    const html = `
      <html>
        <body>
          <a href="ab">short link</a>
          <a href="http://www.example.com/valid">valid link</a>
        </body>
      </html>
    `;
    const result = extract(html, 'http://www.example.com/page');
    const urls = result.map((r: { url: string }) => r.url);
    // "ab" has length 2, which is < 3, so it should be filtered out
    // Only the valid link should appear
    expect(result.length).toBe(1);
    expect(urls[0]).toContain('valid');
  });
});