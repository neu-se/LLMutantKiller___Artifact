import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
  it('should return the correct type for a link url and page url', () => {
    const linkurl = 'http://sub.domain.com/aaa/bbb/index.js';
    const pageurl = 'http://sub.domain.com/aaa/bbb/ccc/index.js';
    const result = gettype(linkurl, pageurl);
    expect(result).toBe('uplevel');
  });
});