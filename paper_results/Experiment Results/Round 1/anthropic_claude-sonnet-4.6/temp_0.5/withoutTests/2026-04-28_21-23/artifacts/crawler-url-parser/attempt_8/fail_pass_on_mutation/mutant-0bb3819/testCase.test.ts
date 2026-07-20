import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype mutation detection via extract", () => {
  it("should classify link with default.html as samelevel relative to page with trailing slash", () => {
    // Use extract which calls gettype internally
    // Page URL: http://example.com/foo/
    // Link in HTML: http://example.com/foo/default.html
    // 
    // In original: linkurl_path normalized to "/foo/" → samelevel with pageurl "/foo/"
    // In mutated:  linkurl_path normalized to "/foo"  → internal with pageurl "/foo/"
    
    const html = '<a href="http://example.com/foo/default.html">link</a>';
    const sourceUrl = "http://example.com/foo/";
    
    const results = extract(html, sourceUrl);
    
    // Find the result for our URL
    const found = results.find(r => r.url && r.url.includes("default"));
    expect(found).toBeDefined();
    expect(found!.type).toBe("samelevel");
  });
});