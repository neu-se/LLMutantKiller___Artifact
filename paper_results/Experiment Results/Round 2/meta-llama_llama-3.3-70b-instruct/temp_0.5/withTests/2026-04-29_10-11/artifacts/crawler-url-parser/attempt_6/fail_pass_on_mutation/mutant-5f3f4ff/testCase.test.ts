import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
  it('should not always return "samelevel"', () => {
    const linkurl1 = { host: 'sub.domain.com', path: '/aaa/bbb/ccc' };
    const pageurl1 = { host: 'sub.domain.com', path: '/aaa/bbb/' };
    const result1 = gettype(linkurl1, pageurl1);
    expect(result1).not.toBe('samelevel');

    const linkurl2 = { host: 'sub.domain.com', path: '/aaa/bbb/' };
    const pageurl2 = { host: 'sub.domain.com', path: '/aaa/bbb/ccc' };
    const result2 = gettype(linkurl2, pageurl2);
    expect(result2).not.toBe('samelevel');
  });
});