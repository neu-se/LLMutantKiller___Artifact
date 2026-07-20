import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function with href length check", () => {
  it("should exclude links with href length less than 3", () => {
    const html = `
      <html>
        <body>
          <a href="ab">short</a>
          <a href="abc">normal</a>
          <a href="mailto:test@example.com">email</a>
        </body>
      </html>
    `;
    const baseUrl = "http://example.com";
    const result = extract(html, baseUrl);
    
    const shortLink = result.find((item) => item.text === "short");
    const normalLink = result.find((item) => item.text === "normal");
    const emailLink = result.find((item) => item.text === "email");
    
    expect(shortLink).toBeUndefined();
    expect(normalLink).toBeDefined();
    expect(normalLink?.url).toBe("http://example.com/abc");
    expect(emailLink).toBeUndefined();
  });
});