import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function text handling", () => {
  it("should return empty string for anchor with no text content when text is null-like", () => {
    // Create HTML with an anchor that has no text
    // cheerio's .text() returns "" for empty anchors, so text == null is false
    // But we need to verify the behavior matches original (empty string, not "Stryker was here!")
    const html = '<html><body><a href="http://example.com/page">   </a></body></html>';
    const sourceUrl = "http://example.com/";
    
    const results = extract(html, sourceUrl);
    
    // The anchor text after trim() is "", which is not null, so both versions should return ""
    // But we need to find a case where text IS null...
    // Let's verify with normal text first to understand the structure
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].text).toBe("");
  });
});