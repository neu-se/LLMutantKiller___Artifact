import { gettype } from '../../../crawler-url-parser.js';

describe('gettype function', () => {
  it('should return "subdomain" when linkurl_subdomain_len is equal to pageurl_subdomain_len', () => {
    const linkurl = 'https://sub.domain.com';
    const pageurl = 'https://sub.domain.com';
    expect(gettype(linkurl, pageurl)).toBe('internal');
  });
});