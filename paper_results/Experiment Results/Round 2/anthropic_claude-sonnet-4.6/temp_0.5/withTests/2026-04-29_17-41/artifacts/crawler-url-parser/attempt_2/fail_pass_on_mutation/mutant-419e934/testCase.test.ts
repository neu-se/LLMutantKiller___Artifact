import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('gettype with index.html normalization for uplevel detection', () => {
  it('should return uplevel when link is parent of page with index.html', () => {
    const result = gettype('http://example.com/aaa/', 'http://example.com/aaa/bbb/index.html');
    expect(result).toBe('uplevel');
  });
});