import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse", () => {
  it("should handle URL needing protocol addition in else branch", () => {
    // When no baseUrl is given and URL has no protocol/leading slash,
    // the else branch adds http:// and then the placeholder runs
    // For a URL that after the first replace still starts with //,
    // original adds http:// but mutated removes //
    // The key: find a URL where after prepend regex, string starts with //
    // prepend regex won't fire if string starts with //
    // So if currentUrlStr somehow starts with // at that point...
    // After LINE A, can't start with //
    // BUT: what if we pass a URL with unicode that looks like //?
    // Actually let's try the case where inner if is true and URL after
    // hash removal starts with //
    // Hash removal: replace(/#.*$/, '') - what if URL is "page#//something"?
    // After hash removal: "page" - no // at start
    // What about URL that is just "#"? -> "" -> prepend -> "http://"
    const result = parse("example.com");
    expect(result).not.toBeNull();
    expect(result?.url).toContain("http://");
  });
});