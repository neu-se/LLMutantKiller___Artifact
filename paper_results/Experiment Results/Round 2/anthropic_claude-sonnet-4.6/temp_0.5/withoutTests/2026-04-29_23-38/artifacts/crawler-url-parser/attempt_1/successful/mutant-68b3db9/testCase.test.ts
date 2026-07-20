import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function - text trimming", () => {
  it("should trim whitespace from link text", () => {
    const html = '<html><body><a href="http://example.com/page">  Hello World  </a></body></html>';
    const sourceUrl = "http://example.com/";
    
    const results = extract(html, sourceUrl);
    
    expect(results.length).toBeGreaterThan(0);
    const link = results.find((r: any) => r.url && r.url.includes("example.com/page"));
    expect(link).toBeDefined();
    expect(link!.text).toBe("Hello World");
  });
});