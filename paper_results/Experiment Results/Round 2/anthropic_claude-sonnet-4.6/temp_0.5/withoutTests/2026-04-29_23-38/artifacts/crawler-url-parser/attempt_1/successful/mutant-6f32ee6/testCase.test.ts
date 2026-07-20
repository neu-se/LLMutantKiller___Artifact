import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('gettype subdomain detection', () => {
  it('should return "subdomain" when link and page have equal-length subdomains on the same domain', () => {
    // Both have subdomain "www" (length 3) - same domain but different hosts
    // linkurl: sub.example.com, pageurl: www.example.com
    // Different hosts, same domain, equal subdomain lengths
    // Original: linkurl_subdomain_len (3) < pageurl_subdomain_len (3) is false -> returns "subdomain"
    // Mutated: linkurl_subdomain_len (3) <= pageurl_subdomain_len (3) is true -> returns "updomain"
    const result = gettype('http://sub.example.com/path', 'http://www.example.com/path');
    expect(result).toBe('subdomain');
  });
});