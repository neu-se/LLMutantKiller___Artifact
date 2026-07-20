import { gettype } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('gettype function', () => {
  it('should return "subdomain" when linkurl_subdomain_len is equal to pageurl_subdomain_len', () => {
    const linkurl = 'https://sub.domain.com';
    const pageurl = 'https://sub.domain.com';
    expect(gettype(linkurl, pageurl)).toBe('internal');
    const linkurl2 = 'https://sub.sub.domain.com';
    const pageurl2 = 'https://sub.sub.domain.com';
    expect(gettype(linkurl2, pageurl2)).toBe('internal');
  });
});