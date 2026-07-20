import { gettype } from "../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
  it('should return "samelevel" when linkurl and pageurl have the same path without index.html', () => {
    const linkurl = 'http://example.com/path/index.html';
    const pageurl = 'http://example.com/path';
    const result = gettype(linkurl, pageurl);
    expect(result).toBe('samelevel');
  });
});