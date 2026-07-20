import { parse, gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype default.html mutation detection', () => {
  it('should correctly classify uplevel when page url ends with default.html', () => {
    // Verify parse gives expected paths
    const linkParsed = parse('http://www.stackoverflow.com/aaa/bbb/');
    const pageParsed = parse('http://www.stackoverflow.com/aaa/bbb/ccc/default.html');
    
    // linkParsed.path should be '/aaa/bbb/'
    // pageParsed.path should be '/aaa/bbb/ccc/default.html'
    // In gettype:
    // original pageurl_path: '/aaa/bbb/ccc/default.html' -> '/aaa/bbb/ccc/'
    // mutated  pageurl_path: '/aaa/bbb/ccc/default.html' -> '/aaa/bbb/ccc'
    // linkurl_path: '/aaa/bbb/' (no default match)
    // linkurl_parts: ['aaa','bbb'] (2), pageurl_parts: ['aaa','bbb','ccc'] (3)
    // diff = -1
    // original: '/aaa/bbb/ccc/'.includes('/aaa/bbb/') = true -> uplevel
    // mutated:  '/aaa/bbb/ccc'.includes('/aaa/bbb/') = false -> internal
    expect(linkParsed!.path).toBe('/aaa/bbb/');
    expect(pageParsed!.path).toBe('/aaa/bbb/ccc/default.html');
    
    const result = gettype(
      'http://www.stackoverflow.com/aaa/bbb/',
      'http://www.stackoverflow.com/aaa/bbb/ccc/default.html'
    );
    expect(result).toBe('uplevel');
  });
});