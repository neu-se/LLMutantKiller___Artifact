import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype subdomain detection", () => {
  it("should return 'subdomain' when link and page have different subdomains of equal length", () => {
    // Both have subdomains of equal length (3 chars each: "www" vs "sub")
    // Original: linkurl_subdomain_len (3) < pageurl_subdomain_len (3) => false => returns "subdomain"
    // Mutated:  linkurl_subdomain_len (3) <= pageurl_subdomain_len (3) => true => returns "updomain"
    const result = gettype("http://sub.example.com/page", "http://www.example.com/page");
    expect(result).toBe("subdomain");
  });
});