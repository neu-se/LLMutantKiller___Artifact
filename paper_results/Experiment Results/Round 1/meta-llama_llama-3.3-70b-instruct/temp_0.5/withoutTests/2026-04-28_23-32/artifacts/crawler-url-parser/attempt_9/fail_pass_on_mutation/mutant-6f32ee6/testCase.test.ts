import { gettype } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('gettype function', () => {
  it('should return "internal" when linkurl_subdomain_len is equal to pageurl_subdomain_len', () => {
    const linkurl = 'https://sub.domain.com';
    const pageurl = 'https://sub.domain.com';
    const result = gettype(linkurl, pageurl);
    expect(result).toBe('samelevel');
    expect(result).not.toBe('updomain');
    const linkurl2 = 'https://sub.domain.com';
    const pageurl2 = 'https://sub.sub.domain.com';
    const result2 = gettype(linkurl2, pageurl2);
    expect(result2).toBe('updomain');
    const linkurl3 = 'https://sub.sub.domain.com';
    const pageurl3 = 'https://sub.domain.com';
    const result3 = gettype(linkurl3, pageurl3);
    expect(result3).toBe('subdomain');
    expect(result).not.toBe('subdomain');
    expect(result2).not.toBe('samelevel');
    expect(result3).not.toBe('updomain');
    expect(result).not.toBe('updomain');
    expect(result2).not.toBe('subdomain');
  });
});