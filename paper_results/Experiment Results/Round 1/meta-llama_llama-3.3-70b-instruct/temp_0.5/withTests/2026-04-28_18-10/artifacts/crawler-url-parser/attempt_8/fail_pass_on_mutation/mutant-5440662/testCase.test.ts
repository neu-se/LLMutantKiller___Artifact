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
    const pageurl = 'http://sub.domain.com/aaa/bbb/Stryker was here!';
    const originalResult = gettype(linkurl, 'http://sub.domain.com/aaa/bbb/');
    const mutatedResult = gettype(linkurl, pageurl);
    expect(originalResult).toBe('sublevel');
    expect(mutatedResult).not.toBe('sublevel');
    if (mutatedResult === 'sublevel') {
      throw new Error('Test failed: gettype returned the same result for mutated code');
    }
  });
});