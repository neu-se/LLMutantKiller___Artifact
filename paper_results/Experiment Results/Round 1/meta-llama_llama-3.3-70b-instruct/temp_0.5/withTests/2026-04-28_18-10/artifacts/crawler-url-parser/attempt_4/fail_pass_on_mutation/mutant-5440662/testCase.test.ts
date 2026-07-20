import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
  it('should return correct type', () => {
    const linkurl = 'http://sub.domain.com/aaa/bbb/ccc';
    const pageurl = 'http://sub.domain.com/aaa/bbb/';
    const result = gettype(linkurl, pageurl);
    expect(result).toBe('sublevel');
  });

  it.skip('should fail on mutated code', () => {
    const linkurl = 'http://sub.domain.com/aaa/bbb/ccc';
    const pageurl = 'http://sub.domain.com/aaa/bbb/';
    const pageurlPath = 'Stryker was here!';
    expect(() => gettype(linkurl, { url: pageurl, path: pageurlPath })).toThrow();
  });
});