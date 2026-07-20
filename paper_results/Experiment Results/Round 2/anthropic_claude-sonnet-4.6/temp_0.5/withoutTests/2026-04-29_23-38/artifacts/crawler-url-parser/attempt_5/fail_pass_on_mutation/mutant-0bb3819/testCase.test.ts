import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype with default path normalization", () => {
  it("should correctly classify sublevel link when pageurl ends with default.html", () => {
    // pageurl_path = /section/default.html -> normalized to /section/
    // linkurl_path = /section/page/default.html -> original: /section/page/, mutated: /section/page
    // diff = 1, includes check: /section/page/.includes(/section/) = true vs /section/page.includes(/section/) = true
    // Need pageurl to end with /default.html so pageurl_path has trailing slash after normalization
    // Then linkurl_path original /section/page/ vs mutated /section/page
    // /section/page/.includes(/section/) both true... 
    // Need the pageurl_path to end with slash AND be specific enough
    // Try: pageurl = /a/default.html -> /a/, linkurl = /a/b/default.html -> /a/b/ or /a/b
    // /a/b/.includes(/a/) = true, /a/b.includes(/a/) = true - still same!
    // The issue: /a/ is substring of /a/b AND /a/b
    // Need pageurl_path with trailing slash where removing it changes includes result
    // pageurl_path = /ab/ : /ab/cd/.includes(/ab/) = true, /ab/cd.includes(/ab/) = true
    // What if linkurl_path after mutation = /a (no slash) and pageurl_path = /a/?
    // linkurl = /a/default.html -> original /a/, mutated /a
    // pageurl has path /a/ ... but URL.parse strips trailing slash from pageurl too
    // Unless pageurl also ends in default.html!
    // pageurl = http://example.com/default.html -> pageurl_path = /default.html -> /
    // linkurl = http://example.com/a/default.html -> original /a/, mutated /a
    // linkurl_parts = ['a'], pageurl_parts = [] (from /)
    // diff = 1, check linkurl_path.includes(pageurl_path)
    // Original: /a/.includes(/) = true -> sublevel
    // Mutated: /a.includes(/) = true -> sublevel - same!
    const result = gettype(
      "http://example.com/aaa/bbb/default.html",
      "http://example.com/aaa/default.html"  
    );
    expect(result).toBe("sublevel");
  });
});