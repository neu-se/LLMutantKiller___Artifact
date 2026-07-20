import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype mutation detection for default page normalization", () => {
  it("should treat /foo/default.html as equivalent to /foo/ when determining sublevel relationship", () => {
    // Use pageurl with trailing slash to ensure pageurl_path ends with "/"
    // linkurl has /default.html which normalizes differently in original vs mutated
    // 
    // linkurl = "/a/default.html"
    // Original: linkurl_path → "/a/"  parts=["a"]
    // Mutated:  linkurl_path → "/a"   parts=["a"]
    //
    // pageurl = "/"  parts=[]  diff = 1-0 = 1
    // Original: linkurl_path.includes(pageurl_path) = "/a/".includes("/") = true → "sublevel"
    // Mutated:  linkurl_path.includes(pageurl_path) = "/a".includes("/") = true → "sublevel"
    // Same... "/" is contained in both
    
    // Need pageurl_path that is contained in "/a/" but NOT in "/a"
    // That would be "/a/" itself - but pageurl can't equal linkurl after normalization
    // 
    // What if pageurl_path = "/a/" (2 parts after split? No, ["a"])
    // and linkurl has 2 parts...
    //
    // linkurl = "/a/b/default.html" → Original: "/a/b/" parts=["a","b"]  Mutated: "/a/b" parts=["a","b"]
    // pageurl = "/a/b/" → parts=["a","b"] diff=0
    // Original: linkurl_without = "/a/b", pageurl_without = "/a/b" → "samelevel"  
    // Mutated:  linkurl_without = "/a", pageurl_without = "/a/b" → "internal"
    
    const linkurl = "http://example.com/a/b/default.html";
    const pageurl = "http://example.com/a/b/";
    
    const result = gettype(linkurl, pageurl);
    expect(result).toBe("samelevel");
  });
});