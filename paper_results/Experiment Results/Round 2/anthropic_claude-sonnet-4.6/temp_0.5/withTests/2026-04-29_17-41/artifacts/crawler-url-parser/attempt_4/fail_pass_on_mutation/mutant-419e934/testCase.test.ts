import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('gettype with index.html in both link and page urls', () => {
  it('should return uplevel when link index page is parent of page index', () => {
    const result = gettype(
      'http://www.stackoverflow.com/aaa/index.html',
      'http://www.stackoverflow.com/aaa/bbb/index.html'
    );
    expect(result).toBe('uplevel');
  });
});