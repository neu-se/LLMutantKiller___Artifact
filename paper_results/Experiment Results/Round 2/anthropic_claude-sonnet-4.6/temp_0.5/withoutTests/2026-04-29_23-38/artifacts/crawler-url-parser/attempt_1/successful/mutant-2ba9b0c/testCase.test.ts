import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype with trailing slash paths", () => {
  it("should return 'samelevel' when link and page are at same directory level with trailing slash on link", () => {
    // linkurl_path = "/aaa/bbb/" (trailing slash)
    // pageurl_path = "/aaa/ccc"
    // Original regex removes "/bbb/" → "/aaa"
    // Mutated regex removes "/bbb" but not "/" → "/aaa/" ≠ "/aaa" → won't return "samelevel"
    const linkUrl = "http://example.com/aaa/bbb/";
    const pageUrl = "http://example.com/aaa/ccc";
    
    const result = gettype(linkUrl, pageUrl);
    
    // Both are at same level under /aaa/, so should be "samelevel"
    expect(result).toBe("samelevel");
  });
});