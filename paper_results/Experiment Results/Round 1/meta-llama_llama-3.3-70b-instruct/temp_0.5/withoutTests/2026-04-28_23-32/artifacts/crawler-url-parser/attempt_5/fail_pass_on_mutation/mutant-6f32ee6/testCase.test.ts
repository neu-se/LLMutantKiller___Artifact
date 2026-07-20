import { gettype } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('gettype function', () => {
  it('should return "internal" when linkurl_subdomain_len is equal to pageurl_subdomain_len and paths are the same', () => {
    const linkurl = 'https://sub.domain.com/path';
    const pageurl = 'https://sub.domain.com/path';
    expect(gettype(linkurl, pageurl)).toBe('samelevel');
    const linkurl2 = 'https://sub.domain.com';
    const pageurl2 = 'https://sub.domain.com';
    expect(gettype(linkurl2, pageurl2)).toBe('samelevel');
  });
});