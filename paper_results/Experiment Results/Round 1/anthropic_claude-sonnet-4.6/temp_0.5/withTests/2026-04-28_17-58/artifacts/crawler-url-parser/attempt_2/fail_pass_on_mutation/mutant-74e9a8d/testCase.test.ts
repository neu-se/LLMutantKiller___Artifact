import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype with default.html in page url path', () => {
  it('should return uplevel when link path is parent of page path ending with /default.html', () => {
    const result = gettype(
      'http://example.com/aaa/',
      'http://example.com/aaa/bbb/default.html'
    );
    expect(result).toBe('uplevel');
  });
});