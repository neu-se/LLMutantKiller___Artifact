import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype mutation detection", () => {
  it("should return sublevel when linkurl is /foo/default.html and pageurl is /foo/", () => {
    // linkurl_path = "/foo/default.html"
    // Original: → "/foo/" → parts=["foo"], count=1
    // pageurl_path = "/foo/" → parts=["foo"], count=1
    // diff = 1-1 = 0... not diff==1
    
    // Need pageurl with 0 parts and linkurl with 1 part after normalization
    // pageurl = "/" (root), linkurl = "/default.html"
    // Original: linkurl → "/" → parts=[], pageurl → "/" → parts=[], diff=0
    // That won't work either
    
    // pageurl = "/foo/" (1 part), linkurl = "/foo/bar/default.html" (should be 2 parts after normalization)
    // Original: linkurl → "/foo/bar/" → parts=["foo","bar"], count=2
    // pageurl → "/foo/" → parts=["foo"], count=1
    // diff = 2-1 = 1
    // linkurl_path.includes(pageurl_path): "/foo/bar/".includes("/foo/") = true → "sublevel"
    // Mutated: linkurl → "/foo/bar" → parts=["foo","bar"], count=2
    // diff = 2-1 = 1
    // "/foo/bar".includes("/foo/") = false → "internal"
    
    const linkurl = "http://example.com/foo/bar/default.html";
    const pageurl = "http://example.com/foo/";
    
    const result = gettype(linkurl, pageurl);
    expect(result).toBe("sublevel");
  });
});