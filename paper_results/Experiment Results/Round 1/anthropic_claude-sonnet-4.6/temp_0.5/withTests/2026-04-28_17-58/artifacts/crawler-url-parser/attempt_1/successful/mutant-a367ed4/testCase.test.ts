import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract should filter out short hrefs with length less than 3', () => {
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
    // In the original code, "ab" has length 2 (< 3) and should be filtered out
    // In the mutated code, "ab" is not filtered because the && changes the logic
    const urls = result.map((r: { url: string }) => r.url);
    expect(result.length).toBe(1);
    expect(urls).toContain('http://www.example.com/valid');
  });
});