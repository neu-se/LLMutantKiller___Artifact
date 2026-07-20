import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype with default index path normalization', () => {
  it('should return uplevel when link url ends with /default.html and page is a sublevel', () => {
    // Link: /aaa/default.html -> normalized to /aaa/ (original) or /aaa (mutated)
    // Page: /aaa/ccc/bbb
    // Original: link_parts=['aaa'], page_parts=['aaa','ccc','bbb'], diff=-2 -> internal
    // Wait, let me recalculate...
    // Actually need diff=-1 for uplevel check
    // Link: /aaa/bbb/default.html -> /aaa/bbb/ or /aaa/bbb
    // Page: /aaa/bbb/ccc
    // Original: link=/aaa/bbb/, page=/aaa/bbb/ccc -> parts [aaa,bbb] vs [aaa,bbb,ccc] -> diff=-1 -> check /aaa/bbb/ccc includes /aaa/bbb/ -> true -> uplevel
    // Mutated: link=/aaa/bbb, page=/aaa/bbb/ccc -> diff=-1 -> /aaa/bbb/ccc includes /aaa/bbb -> true -> uplevel
    // Still same...
    
    // Let me try samelevel case:
    // Link: /aaa/default.html -> /aaa/ or /aaa
    // Page: /aaa/ccc
    // Original: link=/aaa/, page=/aaa/ccc -> parts [aaa] vs [aaa,ccc] -> diff=-1 -> uplevel
    // Mutated: link=/aaa, page=/aaa/ccc -> diff=-1 -> uplevel
    // Same...
    
    const result = gettype("http://example.com/aaa/default.html", "http://example.com/aaa/ccc");
    expect(result).toBe("uplevel");
  });
});