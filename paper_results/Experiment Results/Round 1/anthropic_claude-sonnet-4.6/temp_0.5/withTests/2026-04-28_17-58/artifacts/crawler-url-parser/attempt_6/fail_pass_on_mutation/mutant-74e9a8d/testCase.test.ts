import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype with default.html in page url', () => {
  it('should return uplevel when link is parent directory of page ending with default.html', () => {
    const result = gettype(
      'http://www.stackoverflow.com/aaa/',
      'http://www.stackoverflow.com/aaa/bbb/default.html'
    );
    expect(result).toBe('uplevel');
  });
});