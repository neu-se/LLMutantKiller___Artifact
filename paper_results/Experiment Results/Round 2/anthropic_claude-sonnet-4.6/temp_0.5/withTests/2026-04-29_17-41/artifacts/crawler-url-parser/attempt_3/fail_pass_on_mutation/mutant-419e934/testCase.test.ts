import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('gettype index.html normalization', () => {
  it('should return uplevel when link with trailing slash is parent of page with index.html', () => {
    const result = gettype('http://www.example.com/aaa/', 'http://www.example.com/aaa/bbb/index.html');
    expect(result).toBe('uplevel');
  });
});