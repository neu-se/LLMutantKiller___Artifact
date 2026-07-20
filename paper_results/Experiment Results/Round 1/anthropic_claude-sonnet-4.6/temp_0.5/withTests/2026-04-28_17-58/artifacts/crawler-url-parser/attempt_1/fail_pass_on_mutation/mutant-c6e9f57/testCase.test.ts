import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse URL with www subdomain normalization', () => {
  it('should preserve www subdomain in parsed URL host field', () => {
    // If stripWWW were applied, "www" subdomain would be removed
    // The result_normalize_options has stripWWW: true in original
    // but since the variable is not actually used in parse(),
    // both original and mutated should return www in host
    // We test the actual observable behavior of the parse function
    const result = parse("http://www.google.com/path?q=value");
    expect(result).not.toBeNull();
    expect(result.host).toBe("www.google.com");
    expect(result.url).toBe("http://www.google.com/path?q=value");
    expect(result.subdomain).toBe("www");
    expect(result.domain).toBe("google.com");
  });
});