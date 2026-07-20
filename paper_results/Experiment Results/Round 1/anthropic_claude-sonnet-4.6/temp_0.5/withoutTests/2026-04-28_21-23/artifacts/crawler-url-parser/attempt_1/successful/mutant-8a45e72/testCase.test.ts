import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('gettype with default page path', () => {
  it('should correctly identify samelevel when pageurl has /default.html path', () => {
    // The mutation changes /\/default\.[a-z]+$/ to /\/default\.[^a-z]+$/
    // This means pageurl_path with /default.html will NOT be normalized to '/'
    // in the mutated version, causing different type classification
    
    // pageurl: http://example.com/default.html -> should normalize to http://example.com/
    // linkurl: http://example.com/about.html -> path /about.html
    // With original: pageurl_path normalized to '/', linkurl_path is '/about.html'
    //   parts diff = 1 - 0 = 1, and linkurl includes pageurl -> "sublevel"
    // With mutation: pageurl_path stays '/default.html', linkurl_path is '/about.html'
    //   parts diff = 1 - 1 = 0, paths without last part both '/', -> "samelevel"
    
    const result = gettype('http://example.com/about.html', 'http://example.com/default.html');
    
    // In original code: pageurl_path '/default.html' -> '/', linkurl_path '/about.html'
    // linkurl_parts = ['about.html'], pageurl_parts = []
    // part_count_diff = 1 - 0 = 1
    // linkurl_path '/about.html' includes pageurl_path '/' -> "sublevel"
    expect(result).toBe('sublevel');
  });
});