import { gettype } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('gettype function', () => {
  it('should return "subdomain" when linkurl_subdomain_len is less than pageurl_subdomain_len and not equal', () => {
    const linkurl = 'https://sub.domain.com';
    const pageurl = 'https://sub.sub.domain.com';
    expect(gettype(linkurl, pageurl)).toBe('updomain');
    const linkurl2 = 'https://sub.sub.domain.com';
    const pageurl2 = 'https://sub.domain.com';
    expect(gettype(linkurl2, pageurl2)).toBe('subdomain');
  });
});