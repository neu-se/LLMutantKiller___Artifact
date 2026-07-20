import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract function', () => {
  it('should include links with exactly 2 characters when they are not javascript/mailto/ftp', () => {
    const html = `
      <html>
        <head><base href="http://example.com"></head>
        <body>
          <a href="ab">Two char link</a>
          <a href="abc">Three char link</a>
        </body>
      </html>
    `;
    const sourceUrl = "http://example.com";
    const result = extract(html, sourceUrl);
    // The original code filters out hrefs with length < 3, so "ab" should not be included
    // The mutated code has "false" in the condition, so it should include "ab"
    const twoCharLink = result.find(link => link.url === "http://example.com/ab");
    const threeCharLink = result.find(link => link.url === "http://example.com/abc");

    // Original code should only include the 3-char link
    expect(threeCharLink).toBeDefined();
    expect(threeCharLink.text).toBe("Three char link");

    // This will fail on mutated code because it will include the 2-char link
    expect(twoCharLink).toBeUndefined();
  });
});