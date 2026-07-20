import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype with default.html page url', () => {
  it('should return uplevel when link is parent directory of a page ending with /default.html', () => {
    const result = gettype(
      'http://example.com/aaa/',
      'http://example.com/aaa/bbb/default.html'
    );
    expect(result).toBe('uplevel');
  });
});