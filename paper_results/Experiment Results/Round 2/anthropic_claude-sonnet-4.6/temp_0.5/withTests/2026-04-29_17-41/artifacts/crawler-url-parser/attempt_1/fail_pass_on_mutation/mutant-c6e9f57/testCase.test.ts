import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse url normalization options constant presence', () => {
  it('should parse a URL with www subdomain and preserve it in the result', () => {
    // The result_normalize_options in original has stripWWW: true and removeTrailingSlash: true
    // but since these options are defined but not actually used in parse(),
    // both original and mutated should behave identically.
    // We verify the subdomain field is correctly set to "www" for www URLs,
    // confirming the parse function works correctly regardless of the options object.
    const result = parse("http://www.google.com/path/");
    expect(result).not.toBeNull();
    expect(result.url).toBe("http://www.google.com/path/");
    expect(result.subdomain).toBe("www");
    expect(result.domain).toBe("google.com");
    expect(result.host).toBe("www.google.com");
    expect(result.protocol).toBe("http:");
    expect(result.path).toBe("/path/");
  });
});