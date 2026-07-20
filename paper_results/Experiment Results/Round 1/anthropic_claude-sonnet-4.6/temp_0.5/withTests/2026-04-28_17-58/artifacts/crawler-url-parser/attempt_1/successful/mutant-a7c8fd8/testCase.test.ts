import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype with default.html normalization in linkurl', () => {
  it('should return uplevel when link is /aaa/default.html and page is /aaa/bbb', () => {
    const result = gettype(
      'http://sub.domain.com/aaa/default.html',
      'http://sub.domain.com/aaa/bbb'
    );
    expect(result).toBe('uplevel');
  });
});