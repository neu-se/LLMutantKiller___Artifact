import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
  it('should return correct type for links with default file', () => {
    const linkurl = 'http://example.com/path/default.html';
    const pageurl = 'http://example.com/path/default';
    const result1 = gettype(linkurl, pageurl);
    expect(result1).toBe('uplevel');
    const result2 = gettype(pageurl, linkurl);
    expect(result2).toBe('sublevel');
  });
});