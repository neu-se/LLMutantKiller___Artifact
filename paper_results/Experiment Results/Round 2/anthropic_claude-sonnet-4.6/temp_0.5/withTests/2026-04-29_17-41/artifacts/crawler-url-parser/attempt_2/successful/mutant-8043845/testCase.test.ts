import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract should filter out short href links', () => {
  it('should not include links with href shorter than 3 characters', () => {
    const html = `
      <html>
        <body>
          <a href="ab">short link</a>
          <a href="http://www.example.com/valid-link">valid link</a>
        </body>
      </html>
    `;
    const result = extract(html, "http://www.example.com/");
    // In original code, "ab" is filtered out (length < 3), so only valid-link remains
    // but valid-link is the base url so it gets removed too, leaving 0 results
    // Actually valid-link is a sublevel, let's check differently
    const shortHrefResult = result.filter((r: { url: string }) => r.url.includes('ab'));
    expect(shortHrefResult.length).toBe(0);
  });
});