import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype", () => {
  it("should return 'internal' when URLs have same number of path parts but different parent directories", () => {
    // Both URLs have 2 path segments, but different parent paths
    // linkurl_without_last_part would be "/ccc" and pageurl_without_last_part would be "/aaa"
    // So they are NOT at the same level - should return "internal", not "samelevel"
    const linkUrl = "http://example.com/ccc/ddd";
    const pageUrl = "http://example.com/aaa/bbb";
    
    const result = gettype(linkUrl, pageUrl);
    
    expect(result).toBe("internal");
  });
});