import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype correctly handles page URL ending with /default.html', () => {
  it('should classify link as uplevel when link is one level above a page ending with default.html', () => {
    // page: http://example.com/aaa/bbb/default.html -> normalized path should be /aaa/bbb/
    // link: http://example.com/aaa/ -> path /aaa/
    // link has 1 part, page has 2 parts, diff = -1
    // original: pageurl_path = '/aaa/bbb/', includes('/aaa/') = true -> uplevel
    // mutated:  pageurl_path = '/aaa/bbb',  includes('/aaa/') = false -> internal
    const result = gettype(
      'http://example.com/aaa/',
      'http://example.com/aaa/bbb/default.html'
    );
    expect(result).toBe('uplevel');
  });
});