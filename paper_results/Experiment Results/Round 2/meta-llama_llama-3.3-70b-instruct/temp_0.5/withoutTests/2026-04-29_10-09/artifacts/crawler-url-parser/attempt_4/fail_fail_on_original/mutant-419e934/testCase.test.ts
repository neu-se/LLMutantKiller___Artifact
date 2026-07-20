import { gettype } from "../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
  it('should return "samelevel" when linkurl and pageurl have the same path', () => {
    let linkurl = 'http://example.com/path/to/resource';
    let pageurl = 'http://example.com/path/to/resource/index.html';
    let originalPageUrlPath = pageurl.replace(/\/index\.[a-z]+$/, '/').replace(/\/default\.[a-z]+$/, '/');
    let result = gettype(linkurl, originalPageUrlPath);
    expect(result).toBe('samelevel');
  });
  it('should not return "samelevel" when linkurl and pageurl have the same path with trailing slash', () => {
    let linkurl = 'http://example.com/path/to/resource';
    let pageurl = 'http://example.com/path/to/resource/index.html';
    let mutatedPageUrlPath = pageurl.replace(/\/index\.[a-z]+$/, '').replace(/\/default\.[a-z]+$/, '/');
    let result = gettype(linkurl, mutatedPageUrlPath);
    expect(result).not.toBe('samelevel');
  });
});