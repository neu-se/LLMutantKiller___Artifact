import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('detect mutation in else branch placeholder', () => {
  it('should parse a URL with no base URL where currentUrlStr has no protocol and no leading slashes', () => {
    // For "google.com" without baseUrl:
    // - First unconditional replace: no change (doesn't start with //)
    // - Enters else branch
    // - Inner if: regex doesn't match "google.com", so enters inner if
    // - Prepends http:// -> "http://google.com"  
    // - PLACEHOLDER runs on "http://google.com"
    //   Original: replace ^// with http:// -> "http://google.com" (no change, doesn't start with //)
    //   Mutated:  replace ^// with ""      -> "http://google.com" (no change, doesn't start with //)
    // Still no difference...
    // 
    // THE KEY INSIGHT: What if the inner if prepend creates a string starting with "//"?
    // The prepend regex is /^(?!(?:\w+:)?\/\/)/ which matches start of string NOT followed by protocol or //
    // For input "//google.com" - first unconditional replace makes it "http://google.com"
    //   then regex /^\.*\/|^(?!localhost)\w+:/ matches -> inner if NOT entered -> placeholder runs
    //   on "http://google.com" -> no //  at start -> no difference
    //
    // WAIT: What about the regex /^(?!(?:\w+:)?\/\/)/ applied to a string that starts with //?
    // If somehow currentUrlStr = "//foo" reaches the inner if...
    // The inner if condition: !/^\.*\/|^(?!localhost)\w+:/.test("//foo")
    // "//foo" - does /^\.*\// match? Yes! It starts with optional dots then /
    // So regex MATCHES -> inner if NOT entered -> placeholder runs on "//foo"
    // But "//foo" would have been converted to "http://foo" by the first unconditional replace!
    //
    // I'm going in circles. Let me just try all edge cases empirically.
    const result = parse("//google.com");
    expect(result).not.toBeNull();
    expect(result.url).toBe("http://google.com/");
  });
});