import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function text assignment", () => {
  it("should assign the anchor text to currentUrl.text when text is non-null", () => {
    const html = '<a href="http://example.com/page">Hello World</a>';
    const sourceUrl = "http://example.com/";
    
    const results = extract(html, sourceUrl);
    
    const found = results.find((r: any) => r.url && r.url.includes("example.com/page"));
    expect(found).toBeDefined();
    expect(found.text).toBe("Hello World");
  });
});