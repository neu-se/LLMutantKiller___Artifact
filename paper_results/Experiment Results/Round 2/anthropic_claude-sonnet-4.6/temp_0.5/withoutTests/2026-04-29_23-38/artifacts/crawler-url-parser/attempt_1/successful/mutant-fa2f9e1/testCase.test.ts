import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function text assignment", () => {
  it("should assign the link text to currentUrl.text when the link has non-null text", () => {
    const html = '<a href="http://example.com/page">Hello World</a>';
    const sourceUrl = "http://example.com/";
    
    const results = extract(html, sourceUrl);
    
    expect(results).toHaveLength(1);
    expect(results[0].url).toContain("example.com/page");
    // In original code: text = "Hello World" (not null), so currentUrl.text = "Hello World"
    // In mutated code: text != null ? "" : text => text is "Hello World" (not null), so currentUrl.text = ""
    expect(results[0].text).toBe("Hello World");
  });
});