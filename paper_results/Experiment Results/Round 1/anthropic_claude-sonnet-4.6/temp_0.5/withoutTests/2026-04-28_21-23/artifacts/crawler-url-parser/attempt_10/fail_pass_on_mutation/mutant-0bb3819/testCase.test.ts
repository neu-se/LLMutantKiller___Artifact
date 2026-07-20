import { parse, gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype mutation detection", () => {
  it("should correctly identify sublevel relationship with default.html link", () => {
    // First verify what parse returns
    const parsed = parse("http://example.com/foo/");
    // If path is "/foo/" then our sublevel test should work
    // If path is "/foo" then we need different approach
    
    // The mutation changes linkurl_path replacement from '/' to ''
    // This only matters when linkurl ends with /default.something
    // and the resulting path with/without trailing slash changes includes() result
    
    // Key: we need pageurl_path (after its own normalization) to end with '/'
    // pageurl normalization always uses '/' so that's fine
    // pageurl needs to end with /index.html or /default.html or trailing /
    
    // Let's use pageurl ending with /index.html:
    // pageurl_path = "/foo/index.html" → after normalization → "/foo/"
    // linkurl_path = "/foo/bar/default.html" → Original: "/foo/bar/" Mutated: "/foo/bar"
    // parts: linkurl=["foo","bar"]=2, pageurl=["foo"]=1, diff=1
    // Original: "/foo/bar/".includes("/foo/") = true → sublevel
    // Mutated:  "/foo/bar".includes("/foo/") = false → internal
    
    const result = gettype(
      "http://example.com/foo/bar/default.html",
      "http://example.com/foo/index.html"
    );
    expect(result).toBe("sublevel");
  });
});