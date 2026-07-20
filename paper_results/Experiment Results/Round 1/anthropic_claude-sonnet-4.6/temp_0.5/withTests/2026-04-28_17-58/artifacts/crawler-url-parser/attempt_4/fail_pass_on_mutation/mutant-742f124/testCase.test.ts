import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse result_normalize_options stripFragment behavior', () => {
  it('should return url property without fragment when parsing URL with fragment after query string', () => {
    // The manual regex /#.*$/ strips fragments, but URL.parse behavior with
    // complex URLs may differ based on normalization options
    const result = parse("http://www.example.com/page?q=test#fragment");
    expect(result).not.toBeNull();
    // URL should not contain fragment
    expect(result.url).toBe("http://www.example.com/page?q=test");
    expect(result.url).not.toContain("#fragment");
  });
});