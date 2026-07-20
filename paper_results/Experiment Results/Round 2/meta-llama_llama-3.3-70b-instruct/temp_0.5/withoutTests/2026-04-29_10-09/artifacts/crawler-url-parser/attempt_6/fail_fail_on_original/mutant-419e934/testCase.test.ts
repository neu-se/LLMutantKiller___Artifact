import { gettype } from "./crawler-url-parser";

describe('gettype function', () => {
  it('should return "samelevel" when linkurl and pageurl have the same path', () => {
    let linkurl = 'http://example.com/path/to/resource';
    let pageurl = 'http://example.com/path/to/resource/index.html';
    pageurl = pageurl.replace(/\/index\.[a-z]+$/, '/').replace(/\/default\.[a-z]+$/, '/');
    let result = gettype(linkurl, pageurl);
    expect(result).toBe('samelevel');
  });
});