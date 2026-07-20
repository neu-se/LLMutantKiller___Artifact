import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype with default index normalization", () => {
  it("should return samelevel when linkurl path ends with /default.html and pageurl is at same directory level", () => {
    // linkurl_path = "/foo/default.html" 
    // Original: normalizes to "/foo/" → parts = ["foo"], same level as pageurl "/foo/bar" → parts = ["foo"]
    // Mutated: normalizes to "/foo" → parts = ["foo"], but linkurl_without_last_part = "" != "/foo" → "internal"
    const linkurl = "http://example.com/foo/default.html";
    const pageurl = "http://example.com/foo/bar";
    
    const result = gettype(linkurl, pageurl);
    
    expect(result).toBe("samelevel");
  });
});