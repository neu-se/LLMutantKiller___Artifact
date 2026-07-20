import { gettype } from "./crawler-url-parser.js";

describe('gettype function', () => {
  it('should return "samelevel" when linkurl and pageurl have the same path', () => {
    let linkurl = 'http://example.com/path/to/resource';
    let pageurl = 'http://example.com/path/to/resource/index.html';
    let result = gettype(linkurl, pageurl);
    expect(result).toBe('samelevel');
  });

  it('should return "internal" when linkurl and pageurl have different paths', () => {
    let linkurl = 'http://example.com/path/to/resource';
    let pageurl = 'http://example.com/path/to/resource/index.html';
    let mutatedPageUrlPath = pageurl.replace(/\/index\.[a-z]+$/, '');
    let result = gettype(linkurl, mutatedPageUrlPath);
    expect(result).not.toBe('samelevel');
  });
});