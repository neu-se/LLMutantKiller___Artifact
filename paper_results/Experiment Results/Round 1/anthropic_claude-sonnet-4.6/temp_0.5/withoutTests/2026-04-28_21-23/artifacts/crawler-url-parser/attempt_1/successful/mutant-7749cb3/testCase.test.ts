import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('gettype mutation detection', () => {
  it('should correctly handle /default.html not at end of pageurl path', () => {
    // pageurl has /default.html in the middle (not at end)
    // Original regex with $ won't replace it, mutated regex without $ will
    // 
    // pageurl: http://example.com/default.html/section
    // linkurl: http://example.com/default.html/section/page
    //
    // Original: pageurl_path = "/default.html/section" (no replacement)
    //   linkurl_parts = ["default.html", "section", "page"] length 3
    //   pageurl_parts = ["default.html", "section"] length 2
    //   part_count_diff = 1, linkurl_path includes pageurl_path => "sublevel"
    //
    // Mutated: pageurl_path = "//section" (replacement happened)
    //   pageurl_parts = ["section"] length 1
    //   part_count_diff = 3 - 1 = 2 => "internal"
    
    const result = gettype(
      'http://example.com/default.html/section/page',
      'http://example.com/default.html/section'
    );
    
    expect(result).toBe('sublevel');
  });
});