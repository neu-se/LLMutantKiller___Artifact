import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function with short href", () => {
  it("should include links with href length >= 3 when baseUrl is provided", () => {
    const html = `
      <html>
        <body>
          <a href="ab">short link</a>
          <a href="abc">normal link</a>
        </body>
      </html>
    `;
    const baseUrl = "http://example.com";
    const result = extract(html, baseUrl);
    const shortLink = result.find((item) => item.url === "http://example.com/ab");
    const normalLink = result.find((item) => item.url === "http://example.com/abc");
    
    expect(shortLink).toBeDefined();
    expect(shortLink?.text).toBe("short link");
    expect(normalLink).toBeDefined();
    expect(normalLink?.text).toBe("normal link");
  });
});