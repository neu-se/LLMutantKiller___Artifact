import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('gettype mutation detection', () => {
  it('should correctly handle pageurl with /index.html in the middle of path', () => {
    // pageurl has /index.html NOT at the end of path
    // Original regex has $ anchor, so it won't match /index.html in middle
    // Mutated regex lacks $ anchor, so it WILL match /index.html in middle
    // This causes different path normalization and different type result
    
    const linkurl = 'http://example.com/subpage/';
    const pageurl = 'http://example.com/index.html/subpage/';
    
    // With original: pageurl_path = '/index.html/subpage/' (no replacement, $ anchor prevents match)
    // pageurl_parts = ['index.html', 'subpage']
    // linkurl_parts = ['subpage']
    // part_count_diff = 1 - 2 = -1, pageurl_path.includes(linkurl_path) => '/index.html/subpage/'.includes('/subpage/') => true => "uplevel"
    
    // With mutated: pageurl_path = '//subpage/' (replacement happens)
    // pageurl_parts = ['subpage']
    // linkurl_parts = ['subpage']
    // part_count_diff = 0, check samelevel condition
    // linkurl_without_last_part = '' , pageurl_without_last_part = '/' => not equal => "internal"
    
    const result = gettype(linkurl, pageurl);
    expect(result).toBe('uplevel');
  });
});