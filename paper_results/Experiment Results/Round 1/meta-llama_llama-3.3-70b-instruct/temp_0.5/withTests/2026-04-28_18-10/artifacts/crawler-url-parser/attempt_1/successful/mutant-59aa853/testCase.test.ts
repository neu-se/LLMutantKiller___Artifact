import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract function', () => {
  it('should extract urls and append text to existing url', () => {
    const html = `
      <html>
        <body>
          <a href="http://www.stackoverflow.com/internal-1">test-link-1</a>
          <a href="http://www.stackoverflow.com/internal-1">test-link-2</a>
        </body>
      </html>
    `;
    const baseUrl = "http://www.stackoverflow.com";
    const result = extract(html, baseUrl);
    expect(result.length).toBe(1);
    expect(result[0].url).toBe("http://www.stackoverflow.com/internal-1");
    expect(result[0].text).toBe("test-link-1 test-link-2");
  });
});