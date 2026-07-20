import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse URL with trailing slash', () => {
  it('should preserve trailing slash in URL path since normalization options are not applied', () => {
    // The result_normalize_options object (including removeTrailingSlash) is defined
    // but not actually applied in the parse function - Node URL.format preserves trailing slashes
    const result = parse("http://www.google.com/aaa/");
    expect(result).not.toBeNull();
    // Both original (removeTrailingSlash: true) and mutated (removeTrailingSlash: false)
    // produce the same output since the options are not applied
    expect(result!.url).toBe("http://www.google.com/aaa/");
  });
});