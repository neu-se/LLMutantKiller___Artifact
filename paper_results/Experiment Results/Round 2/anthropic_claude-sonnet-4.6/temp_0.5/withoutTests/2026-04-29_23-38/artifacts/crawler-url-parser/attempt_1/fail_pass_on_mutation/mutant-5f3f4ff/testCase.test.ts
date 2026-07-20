import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('gettype', () => {
  it('should return uplevel when linkurl has one fewer path part and is a prefix of pageurl path', () => {
    // part_count_diff = -1 (link has 2 parts, page has 3 parts)
    // pageurl_path includes linkurl_path
    const result = gettype('http://example.com/aaa/bbb/', 'http://example.com/aaa/bbb/ccc/');
    expect(result).toBe('uplevel');
  });
});