import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype subdomain classification when subdomains have equal length', () => {
  it('should return "subdomain" when link url and page url have different subdomains of equal length on the same domain', () => {
    // Both URLs have subdomains of equal length (3 chars each: "faq" vs "ask")
    // Original code: linkurl_subdomain_len < pageurl_subdomain_len => 3 < 3 => false => falls through to "subdomain"
    // Mutated code: linkurl_subdomain_len <= pageurl_subdomain_len => 3 <= 3 => true => returns "updomain" (wrong)
    const result = gettype(
      "http://ask.stackoverflow.com/",
      "http://faq.stackoverflow.com/"
    );
    expect(result).toBe("subdomain");
  });
});