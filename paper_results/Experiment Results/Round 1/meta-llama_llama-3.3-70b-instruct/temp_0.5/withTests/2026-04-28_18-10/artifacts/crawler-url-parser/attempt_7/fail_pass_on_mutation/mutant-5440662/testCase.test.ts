import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
  it('should return correct type', () => {
    const linkurl = 'http://sub.domain.com/aaa/bbb/ccc';
    const pageurl = 'http://sub.domain.com/aaa/bbb/';
    const result = gettype(linkurl, pageurl);
    expect(result).toBe('sublevel');
  });

  it('should fail on mutated code', () => {
    const linkurl = 'http://sub.domain.com/aaa/bbb/ccc';
    const pageurl = 'http://sub.domain.com/aaa/bbb/Stryker was here!';
    expect(() => {
      const result = gettype(linkurl, pageurl);
      if (result === 'sublevel') {
        throw new Error('Expected gettype to return a different value for mutated code');
      }
    }).toThrowError();
  });
});