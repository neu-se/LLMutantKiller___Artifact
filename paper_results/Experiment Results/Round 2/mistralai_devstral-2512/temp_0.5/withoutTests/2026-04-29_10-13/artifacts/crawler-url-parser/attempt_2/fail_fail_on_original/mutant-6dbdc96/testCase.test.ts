import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract function', () => {
  it('should include links with exactly 2 characters when they are not javascript/mailto/ftp', () => {
    const html = `
      <html>
        <head><base href="http://example.com"></head>
        <body>
          <a href="ab">Two char link</a>
        </body>
      </html>
    `;
    const sourceUrl = "http://example.com";
    const result = extract(html, sourceUrl);
    const twoCharLink = result.find(link => link.url === "http://example.com/ab");
    expect(twoCharLink).toBeDefined();
    expect(twoCharLink.text).toBe("Two char link");
  });
});