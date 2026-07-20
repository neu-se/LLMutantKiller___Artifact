import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype with default page normalization", () => {
  it("should return internal when linkurl ends with /bar/default.html and pageurl is /bar", () => {
    // linkurl_path = "/bar/default.html"
    // Original: normalizes to "/bar/" → linkurl_without_last_part = "/bar"
    //           pageurl_path = "/bar" → pageurl_without_last_part = ""
    //           "/bar" != "" → "internal"
    // Mutated: normalizes to "/bar" → linkurl_without_last_part = ""
    //          pageurl_path = "/bar" → pageurl_without_last_part = ""
    //          "" == "" → "samelevel"
    const linkurl = "http://example.com/bar/default.html";
    const pageurl = "http://example.com/bar";
    
    const result = gettype(linkurl, pageurl);
    
    expect(result).toBe("internal");
  });
});