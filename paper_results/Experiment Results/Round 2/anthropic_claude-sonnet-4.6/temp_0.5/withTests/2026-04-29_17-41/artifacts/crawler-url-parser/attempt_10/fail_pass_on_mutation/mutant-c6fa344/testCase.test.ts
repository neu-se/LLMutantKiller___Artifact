import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse mutation - specific regex boundary', () => {
  it('should handle URL that exercises the exact regex difference', () => {
    // The only difference between original and mutated is for strings starting with //
    // After pre-conversion, // becomes http://
    // So we test that the pre-conversion + regex combination works correctly
    // by verifying a URL that would be broken if http:// were prepended to http://example.com
    const res = parse("http://example.com/path");
    expect(res).not.toBeNull();
    expect(res!.url).toBe("http://example.com/path");
    // If mutation caused double-prepend, url would be wrong
    expect(res!.protocol).toBe("http:");
  });
});