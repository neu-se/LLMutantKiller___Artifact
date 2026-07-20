import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype with index in middle of page URL path', () => {
  it('should correctly classify link type when page URL contains /index.html in the middle of path', () => {
    // Page URL has /index.html in the middle (not at end), link is at same host
    // Link: http://example.com/aaa/bbb (2 path parts: ['aaa', 'bbb'])
    // Page: http://example.com/index.html/bbb
    //   Original: pageurl_path stays '/index.html/bbb', parts = ['index.html', 'bbb'] (2 parts)
    //     -> part_count_diff = 0, check samelevel: linkurl_without_last_part='/aaa' vs pageurl_without_last_part='/index.html' -> not equal -> "internal"
    //   Mutated: /index.html is replaced (no $ anchor), pageurl_path becomes '//bbb', parts = ['bbb'] (1 part)
    //     -> part_count_diff = 1, check sublevel: '/aaa/bbb'.includes('//bbb') -> false -> "internal"
    // Both return "internal" here... need a better case
    
    // Let's try: link = http://example.com/index.html/bbb, page = http://example.com/index.html/ccc
    // Original: linkurl_path '/index.html/bbb' -> no replace (not at end) stays '/index.html/bbb', parts=['index.html','bbb']
    //           pageurl_path '/index.html/ccc' -> no replace stays '/index.html/ccc', parts=['index.html','ccc']
    //           part_count_diff=0, linkurl_without_last_part='/index.html', pageurl_without_last_part='/index.html' -> "samelevel"
    // Mutated:  linkurl_path '/index.html/bbb' -> linkurl uses same regex with $, no change -> stays '/index.html/bbb'
    //           pageurl_path '/index.html/ccc' -> mutated replaces /index.html -> '//ccc', parts=['ccc']
    //           part_count_diff = 2-1=1, check sublevel: '/index.html/bbb'.includes('//ccc') -> false -> "internal"
    const result = gettype(
      'http://example.com/index.html/bbb',
      'http://example.com/index.html/ccc'
    );
    expect(result).toBe('samelevel');
  });
});