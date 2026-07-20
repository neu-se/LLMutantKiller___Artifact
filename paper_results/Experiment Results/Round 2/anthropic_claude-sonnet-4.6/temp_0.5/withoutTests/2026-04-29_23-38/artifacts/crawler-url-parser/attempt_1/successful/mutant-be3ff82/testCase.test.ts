import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe("gettype with index page paths", () => {
  it("should correctly identify samelevel when pageurl has index.html path", () => {
    // The mutation changes /\/index\.[a-z]+$/ to /\/index\.[^a-z]+$/
    // This means pageurl_path with /index.html will NOT be normalized to '/'
    // but in the original it WILL be normalized to '/'
    // 
    // With original: pageurl_path "/index.html" -> "/"
    // With mutation: pageurl_path "/index.html" stays "/index.html" (no match for [^a-z]+)
    //
    // Test: link at "/" should be "samelevel" with page at "/index.html"
    // Original: both become "/" -> samelevel
    // Mutated: link is "/", page stays "/index.html" -> different paths -> internal
    
    const result = gettype("http://example.com/", "http://example.com/index.html");
    expect(result).toBe("samelevel");
  });
});