import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype mutation detection", () => {
  it("should return uplevel when linkurl is root default and pageurl has subpath", () => {
    // linkurl_path = "/default.html"
    // Original: → "/"  parts=[]
    // Mutated:  → ""   parts=[]
    // pageurl_path = "/foo/bar"  parts=["foo","bar"]
    // diff = 0-2 = -2, not -1, so no uplevel check
    // → "internal" for both
    
    // Try diff = -1:
    // pageurl_path = "/foo"  parts=["foo"]
    // linkurl_path = "/default.html" → Original "/" parts=[] → diff=-1
    // Original: pageurl_path.includes(linkurl_path) = "/foo".includes("/") = true → "uplevel"
    // Mutated:  pageurl_path.includes(linkurl_path) = "/foo".includes("") = true → "uplevel"
    // Same...
    
    // The only way includes differs: need string that contains "/" but not ""... impossible
    // "" is always included in any string
    // So the diff must come from part_count_diff or the samelevel check
    
    // For samelevel (diff==0):
    // linkurl_without = linkurl_path.replace(/(\/[^\/]*)[\/]?$/, "")
    // If linkurl_path = "/" (original): replace → ""
    // If linkurl_path = "" (mutated): replace → ""
    // pageurl_path = "/": replace → ""
    // Both give samelevel... 
    
    // What if linkurl_path = "/foo/" (original from "/foo/default.html") vs "/foo" (mutated)
    // pageurl_path = "/foo/"
    // linkurl_without for "/foo/": regex on "/foo/" → matches "/" at end → result "/foo"
    // linkurl_without for "/foo": regex on "/foo" → matches "/foo" → result ""
    // pageurl_without for "/foo/": → "/foo"
    // Original: "/foo" == "/foo" → "samelevel"
    // Mutated: "" != "/foo" → "internal"
    
    const linkurl = "http://example.com/foo/default.html";
    const pageurl = "http://example.com/foo/";
    
    const result = gettype(linkurl, pageurl);
    expect(result).toBe("samelevel");
  });
});