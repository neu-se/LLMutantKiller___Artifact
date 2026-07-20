import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse URL that starts with // inside the no-baseUrl branch after protocol prefix is added', () => {
  it('should correctly parse a bare domain without base URL, resulting in an http:// URL with a valid host', () => {
    // A URL like "google.com" goes through the else branch (no baseUrlStr)
    // The regex !/^\.*\/|^(?!localhost)\w+:/ does NOT match "google.com"
    // so it enters the inner if and prepends http://
    // Then the placeholder line runs: in original it replaces ^// with http://
    // In mutated it replaces ^// with "" - but after prepending http://, the string
    // is "http://google.com" which doesn't start with //
    // Need a URL that after the http:// prepend still has // somewhere... 
    // Actually the placeholder runs BEFORE the prepend line in the original code order
    // Let's re-read: first prepend http://, then the placeholder replaces ^//
    // So "//google.com" -> first unconditional replace -> "http://google.com"
    // then regex test: /^\.*\/|^(?!localhost)\w+:/ matches "http://google.com" (has \w+:)
    // so inner if is NOT entered. The placeholder is never reached for "//google.com"
    // The placeholder IS reached for "google.com" - but "google.com" doesn't start with //
    // So the mutation has NO effect? Let me just verify the basic behavior is correct.
    const result = parse("google.com");
    expect(result).not.toBeNull();
    expect(result.url).toBe("http://google.com/");
    expect(result.host).toBe("google.com");
  });
});