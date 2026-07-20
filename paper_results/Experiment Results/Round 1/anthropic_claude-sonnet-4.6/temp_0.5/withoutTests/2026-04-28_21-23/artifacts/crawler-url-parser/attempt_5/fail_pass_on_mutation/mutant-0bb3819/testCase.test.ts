import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype mutation detection", () => {
  it("should return sublevel when linkurl ends with /default.html and pageurl ends with /index.html at parent level", () => {
    // linkurl_path = "/foo/bar/default.html"
    // Original: → "/foo/bar/"
    // Mutated: → "/foo/bar"
    // pageurl_path = "/foo/index.html" → "/foo/" (both original and mutated normalize pageurl with '/')
    // parts: linkurl=["foo","bar"] count=2, pageurl=["foo"] count=1, diff=1
    // Original: "/foo/bar/".includes("/foo/") = true → "sublevel"
    // Mutated: "/foo/bar".includes("/foo/") = false → "internal"
    
    const linkurl = "http://example.com/foo/bar/default.html";
    const pageurl = "http://example.com/foo/index.html";
    
    const result = gettype(linkurl, pageurl);
    expect(result).toBe("sublevel");
  });
});