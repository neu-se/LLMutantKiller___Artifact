import { gettype } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('gettype function', () => {
  it('should return "subdomain" when linkurl_subdomain_len is equal to pageurl_subdomain_len', () => {
    const linkurl = 'https://sub.domain.com/path';
    const pageurl = 'https://sub.domain.com/path';
    expect(gettype(linkurl, pageurl)).toBe('samelevel');
    const linkurl2 = 'https://sub.sub.domain.com';
    const pageurl2 = 'https://sub.domain.com';
    expect(gettype(linkurl2, pageurl2)).toBe('subdomain');
  });
});