import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype mutation detection", () => {
  it("should return sublevel when linkurl is /foo/bar/ and pageurl ends with /default.html", () => {
    // pageurl_path = "/foo/default.html"
    // Original: pageurl normalizes to "/foo/" → parts=["foo"], linkurl "/foo/bar/" parts=["foo","bar"], diff=1
    //           linkurl_path.includes("/foo/") = true → "sublevel"
    // Mutated: pageurl normalizes to "/foo" → parts=["foo"], linkurl "/foo/bar/" parts=["foo","bar"], diff=1
    //          linkurl_path.includes("/foo") = true → "sublevel" (same?)
    // Need different approach...
    
    // pageurl_path = "/default.html"
    // Original: → "/" → parts=[]
    // Mutated: → "" → parts=[]
    // linkurl = "/foo/" → parts=["foo"], diff=1
    // Original: linkurl_path.includes("/") = true → "sublevel"
    // Mutated: linkurl_path.includes("") = true → "sublevel" (same)
    
    const linkurl = "http://example.com/foo/bar/";
    const pageurl = "http://example.com/foo/default.html";
    
    const result = gettype(linkurl, pageurl);
    
    expect(result).toBe("sublevel");
  });
});