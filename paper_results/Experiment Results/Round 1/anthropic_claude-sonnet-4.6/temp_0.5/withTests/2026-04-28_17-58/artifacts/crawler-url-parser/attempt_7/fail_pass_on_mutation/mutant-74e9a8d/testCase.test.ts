import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype with default.html normalization in pageurl', () => {
  it('should return uplevel when link path with trailing slash is parent of page path ending with default.html', () => {
    const result = gettype(
      'http://www.stackoverflow.com/aaa/bbbX/',
      'http://www.stackoverflow.com/aaa/bbbX/ccc/default.html'
    );
    expect(result).toBe('uplevel');
  });
});