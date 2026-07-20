import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype subdomain detection with equal subdomain lengths', () => {
  it('should return "subdomain" when link and page have different subdomains of equal length on the same domain', () => {
    // Both "faq" and "www" have length 3, so linkurl_subdomain_len === pageurl_subdomain_len
    // Original: < means equal case falls through to "subdomain"
    // Mutated: <= means equal case returns "updomain" instead
    const result = gettype(
      "http://faq.stackoverflow.com/page",
      "http://www.stackoverflow.com/page"
    );
    expect(result).toBe("subdomain");
  });
});