import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function with undefined href", () => {
  it("should not throw when an anchor tag has no href attribute", () => {
    const html = '<html><body><a>Link without href</a><a href="http://example.com">Valid link</a></body></html>';
    const sourceUrl = "http://www.example.com/page";
    
    expect(() => {
      const result = extract(html, sourceUrl);
      // The result should be an array with only the valid link
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(1);
      expect(result[0].url).toContain("example.com");
    }).not.toThrow();
  });
});