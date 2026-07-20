import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function with mixed href lengths", () => {
  it("should handle both short and long hrefs correctly", () => {
    const html = `
      <html>
        <body>
          <a href="ab">two chars</a>
          <a href="abc">three chars</a>
          <a href="abcd">four chars</a>
        </body>
      </html>
    `;
    const result = extract(html, "http://example.com");
    expect(result).toHaveLength(2);
    expect(result[0].url).toBe("http://example.com/abc");
    expect(result[0].text).toBe("three chars");
    expect(result[1].url).toBe("http://example.com/abcd");
    expect(result[1].text).toBe("four chars");
  });
});