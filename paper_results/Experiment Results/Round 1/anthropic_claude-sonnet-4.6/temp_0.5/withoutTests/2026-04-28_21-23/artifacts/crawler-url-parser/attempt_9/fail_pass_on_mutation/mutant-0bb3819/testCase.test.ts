import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype mutation detection", () => {
  it("should return sublevel when linkurl default.html is one level deeper than pageurl with trailing slash", () => {
    // linkurl_path = "/foo/bar/default.html"
    // Original: → "/foo/bar/" parts=["foo","bar"] count=2
    // Mutated:  → "/foo/bar"  parts=["foo","bar"] count=2
    //
    // pageurl = "http://example.com/foo/" → path="/foo/" → parts=["foo"] count=1
    // pageurl_path after normalization: "/foo/" (no index/default) stays "/foo/"
    //
    // diff = 2-1 = 1 → check linkurl_path.includes(pageurl_path)
    // Original: "/foo/bar/".includes("/foo/") = true → "sublevel"
    // Mutated:  "/foo/bar".includes("/foo/")  = false → "internal"
    //
    // BUT WAIT - pageurl_path normalization line also runs:
    // pageurl_path = pageurl_path.replace(/\/index\.[a-z]+$/, '/').replace(/\/default\.[a-z]+$/, '/');
    // "/foo/" has no index/default → stays "/foo/"
    
    const result = gettype(
      "http://example.com/foo/bar/default.html",
      "http://example.com/foo/"
    );
    expect(result).toBe("sublevel");
  });
});