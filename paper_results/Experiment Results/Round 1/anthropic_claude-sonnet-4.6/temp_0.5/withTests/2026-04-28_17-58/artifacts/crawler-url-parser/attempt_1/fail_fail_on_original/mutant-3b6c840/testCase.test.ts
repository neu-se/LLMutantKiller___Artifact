import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse URL trailing slash behavior', () => {
  it('should remove trailing slash from URL path when removeTrailingSlash is true', () => {
    // With removeTrailingSlash: true, "http://www.google.com/aaa/" should become "http://www.google.com/aaa"
    // With removeTrailingSlash: false, "http://www.google.com/aaa/" should remain "http://www.google.com/aaa/"
    // The result_normalize_options with removeTrailingSlash: true means trailing slashes are stripped
    // Testing with a URL that has a trailing slash on a non-root path
    const result = parse("http://www.google.com/aaa/");
    // Original code has removeTrailingSlash: true, so trailing slash should be removed
    expect(result).not.toBeNull();
    expect(result!.url).toBe("http://www.google.com/aaa");
  });
});