import { gettype } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('gettype function', () => {
  it('should return "internal" when linkurl_subdomain_len is equal to pageurl_subdomain_len', () => {
    const linkurl = 'https://sub.domain.com';
    const pageurl = 'https://sub.domain.com';
    const result = gettype(linkurl, pageurl);
    expect(result).toBe('samelevel');
  });
  it('should return "updomain" when linkurl_subdomain_len is less than pageurl_subdomain_len', () => {
    const linkurl = 'https://sub.domain.com';
    const pageurl = 'https://sub.sub.domain.com';
    const result = gettype(linkurl, pageurl);
    expect(result).toBe('updomain');
  });
  it('should return "subdomain" when linkurl_subdomain_len is greater than pageurl_subdomain_len', () => {
    const linkurl = 'https://sub.sub.domain.com';
    const pageurl = 'https://sub.domain.com';
    const result = gettype(linkurl, pageurl);
    expect(result).toBe('subdomain');
  });
  it('should return "samelevel" when linkurl_subdomain_len is equal to pageurl_subdomain_len and paths are the same', () => {
    const linkurl = 'https://sub.domain.com/path';
    const pageurl = 'https://sub.domain.com/path';
    const result = gettype(linkurl, pageurl);
    expect(result).toBe('samelevel');
  });
});