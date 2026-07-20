import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('gettype with index page url', () => {
  it('should return sublevel when link is child of page with index.html', () => {
    // page: /aaa/index.html -> original normalizes to /aaa/, mutant normalizes to /aaa
    // link: /aaa/bbb/ccc -> parts=['aaa','bbb','ccc'], page parts=['aaa'], diff=2 -> internal
    // Need diff=1: link /aaa/bbb, page /aaa/index.html
    const result = gettype('http://example.com/aaa/bbb', 'http://example.com/aaa/index.html');
    expect(result).toBe('sublevel');
  });
});