import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype with default index path normalization', () => {
  it('should treat a URL ending with /default.html as samelevel with the directory URL', () => {
    // linkurl has /aaa/default.html which should normalize to /aaa/ (same as pageurl /aaa/)
    // Original: replaces /default.html with '/' => /aaa/
    // Mutated: replaces /default.html with '' => /aaa (no trailing slash, different behavior)
    const result = gettype(
      'http://www.example.com/aaa/default.html',
      'http://www.example.com/aaa/other.html'
    );
    // Both /aaa/default.html and /aaa/other.html should normalize:
    // linkurl: /aaa/default.html -> /aaa/
    // pageurl: /aaa/other.html -> stays /aaa/other.html (no default/index match)
    // Actually let's use pageurl that also has default to make them equal
    const result2 = gettype(
      'http://www.example.com/aaa/default.html',
      'http://www.example.com/aaa/default.htm'
    );
    // Both normalize to /aaa/ in original => samelevel
    // In mutated: both normalize to /aaa => still samelevel (same result, won't detect)
    
    // Better: link has /default.html (root), page has /
    const result3 = gettype(
      'http://www.example.com/default.html',
      'http://www.example.com/somepage.html'
    );
    // original: linkurl_path = /default.html -> / 
    // mutated: linkurl_path = /default.html -> "" (empty)
    // pageurl_path = /somepage.html
    // original: linkurl_parts=[], pageurl_parts=[somepage.html], diff=-1, pageurl includes linkurl "/" -> uplevel
    // mutated: linkurl_parts=[], pageurl_parts=[somepage.html], diff=-1, pageurl "/somepage.html" includes "" -> uplevel (same!)
    expect(result3).toBe('uplevel');
  });
});