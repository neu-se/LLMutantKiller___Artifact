import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe("gettype with index file paths", () => {
  it("should correctly identify samelevel when pageurl has /index.html (multi-char extension)", () => {
    // The mutation changes /\/index\.[a-z]+$/ to /\/index\.[a-z]$/ 
    // This means extensions with more than one character (like .html, .php, .aspx) 
    // won't be replaced in pageurl_path with the mutated code
    // 
    // With original: pageurl_path "/aaa/index.html" -> "/aaa/" 
    // With mutant:   pageurl_path "/aaa/index.html" stays as "/aaa/index.html" (not replaced, since 'html' is more than 1 char)
    //
    // linkurl: "http://example.com/aaa/page.html"
    // pageurl: "http://example.com/aaa/index.html"
    // After normalization in original: both paths become "/aaa/" level -> samelevel
    // In mutant: pageurl stays "/aaa/index.html", linkurl becomes "/aaa/" -> different behavior

    const linkurl = "http://example.com/aaa/page.html";
    const pageurl = "http://example.com/aaa/index.html";
    
    const result = gettype(linkurl, pageurl);
    
    // In the original code, pageurl_path "/aaa/index.html" gets normalized to "/aaa/"
    // and linkurl_path "/aaa/page.html" stays as "/aaa/page.html"
    // Both have the same parent directory "/aaa/" -> samelevel
    expect(result).toBe("samelevel");
  });
});