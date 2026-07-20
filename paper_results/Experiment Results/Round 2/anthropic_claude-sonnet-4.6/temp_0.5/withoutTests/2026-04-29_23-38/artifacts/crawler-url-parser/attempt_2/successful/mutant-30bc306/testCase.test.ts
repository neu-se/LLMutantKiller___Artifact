import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe("gettype with index.html in pageurl", () => {
  it("should return sublevel when linkurl is a page and pageurl is index.html at root", () => {
    // Original: pageurl_path "/index.html" -> "/" (normalized)
    // linkurl_path "/about.html" stays as "/about.html"
    // part_count_diff = 1 - 0 = 1, "/about.html".includes("/") = true -> "sublevel"
    //
    // Mutant: pageurl_path "/index.html" stays as "/index.html" (not normalized, 'html' > 1 char)
    // linkurl_path "/about.html" stays as "/about.html"
    // part_count_diff = 1 - 1 = 0, same parent check -> "samelevel"

    const linkurl = "http://example.com/about.html";
    const pageurl = "http://example.com/index.html";
    
    const result = gettype(linkurl, pageurl);
    
    expect(result).toBe("sublevel");
  });
});