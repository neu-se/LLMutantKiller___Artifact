import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function with javascript href", () => {
  it("should exclude javascript links when extracting URLs", () => {
    const html = `
      <html>
        <body>
          <a href="javascript:void(0)">javascript link</a>
          <a href="http://example.com/valid">valid link</a>
        </body>
      </html>
    `;
    const baseUrl = "http://example.com";
    const result = extract(html, baseUrl);
    
    const jsLink = result.find((item) => item.text === "javascript link");
    const validLink = result.find((item) => item.text === "valid link");
    
    expect(jsLink).toBeUndefined();
    expect(validLink).toBeDefined();
    expect(validLink?.url).toBe("http://example.com/valid");
  });
});