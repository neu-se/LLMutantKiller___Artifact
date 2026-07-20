import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype with default page url normalization', () => {
  it('should return samelevel when page url ends with /default.htm and link is at same level', () => {
    // pageurl has /default.htm which should be normalized to '/' by the original code
    // linkurl is at the same directory level
    // Original: pageurl_path "/aaa/default.htm" -> "/aaa/" -> parts: ["aaa"]
    //           linkurl_path "/aaa/bbb" -> parts: ["aaa", "bbb"]
    // Wait, let me reconsider...
    
    // pageurl: http://example.com/aaa/default.htm -> normalized to /aaa/
    // linkurl: http://example.com/aaa/bbb -> path /aaa/bbb
    // parts diff: linkurl_parts ["aaa","bbb"] len=2, pageurl_parts ["aaa"] len=1
    // part_count_diff = 2-1 = 1, and linkurl_path includes pageurl_path "/aaa/" -> "sublevel"
    
    // Better scenario:
    // pageurl: http://example.com/aaa/default.htm -> normalized to /aaa/
    // linkurl: http://example.com/aaa/ -> path /aaa/
    // parts: both ["aaa"], diff=0
    // linkurl_without_last_part = "/aaa/".replace(/(\/[^\/]*)[\/]?$/, "") = ""
    // pageurl_without_last_part = "/aaa/".replace(...) = ""
    // "" == "" -> "samelevel"
    
    // With mutation: pageurl_path stays "/aaa/default.htm"
    // pageurl_parts = ["aaa", "default.htm"], linkurl_parts = ["aaa"]
    // part_count_diff = 1 - 2 = -1
    // pageurl_path.includes(linkurl_path): "/aaa/default.htm".includes("/aaa/") -> true -> "uplevel"
    
    const result = gettype(
      "http://example.com/aaa/",
      "http://example.com/aaa/default.htm"
    );
    expect(result).toBe("samelevel");
  });
});