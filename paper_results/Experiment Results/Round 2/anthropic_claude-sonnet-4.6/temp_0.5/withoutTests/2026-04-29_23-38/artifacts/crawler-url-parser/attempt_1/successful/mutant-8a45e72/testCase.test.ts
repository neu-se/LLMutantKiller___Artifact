import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe("gettype with default index paths", () => {
  it("should treat pageurl with /default.html as same level when linkurl matches", () => {
    // The mutation changes /\/default\.[a-z]+$/ to /\/default\.[^a-z]+$/
    // This means pageurl_path.replace for /default.html won't work in mutated code
    // because 'html' matches [a-z]+ but not [^a-z]+
    
    // page URL has /default.html which should be normalized to '/'
    // link URL is at the same level
    const pageUrl = "http://www.example.com/default.html";
    const linkUrl = "http://www.example.com/about.html";
    
    // In original: pageurl_path becomes '/' after replacing /default.html
    // So pageurl_parts = [] and linkurl_parts = ['about.html']
    // part_count_diff = 1 - 0 = 1, and linkurl_path includes pageurl_path ('/')
    // so returns "sublevel"
    
    // In mutated: pageurl_path stays '/default.html' (not replaced)
    // pageurl_parts = ['default.html'], linkurl_parts = ['about.html']
    // part_count_diff = 0
    // linkurl_without_last_part = '' and pageurl_without_last_part = ''
    // so returns "samelevel"
    
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("sublevel");
  });
});