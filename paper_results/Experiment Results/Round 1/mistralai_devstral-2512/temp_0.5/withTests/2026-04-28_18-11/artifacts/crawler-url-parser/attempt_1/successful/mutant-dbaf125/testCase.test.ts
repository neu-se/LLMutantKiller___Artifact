// test/duplicate-text-concatenation.test.ts
import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract function duplicate text handling', () => {
  it('should not concatenate duplicate text when URL already exists', () => {
    const html = `
      <html>
        <body>
          <a href="http://example.com/page1">First Link</a>
          <a href="http://example.com/page1">First Link</a>
        </body>
      </html>
    `;
    const result = extract(html, "http://example.com");
    const page1Link = result.find(link => link.url === "http://example.com/page1");
    expect(page1Link?.text).toBe("First Link");
  });
});