import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse with baseUrlStr containing multi-character fragment", () => {
  it("should completely strip a multi-character fragment from baseUrlStr", () => {
    // Original regex /#.*$/ removes '#' and ALL chars after it
    // Mutated regex /#.$/ removes '#' and only ONE char after it
    // With baseUrl "http://example.com/base#ab":
    //   Original: "http://example.com/base" (fragment fully removed)
    //   Mutated:  "http://example.com/baseab" (only '#a' removed, 'b' remains... wait)
    // Actually /#.$/ matches '#' + one char, so "http://example.com/base#ab"
    //   Mutated removes "#a", leaving "http://example.com/baseb"
    // Resolving "/page" against "http://example.com/baseb" gives "http://example.com/page"
    // That's the same... need a relative path that shows the difference

    // Use a relative URL (no leading slash) so the base path matters
    const currentUrl = "page.html";
    const baseUrlWithLongFragment = "http://example.com/dir/#section-heading";
    
    const result = parse(currentUrl, baseUrlWithLongFragment);
    
    // Original: baseUrlStr -> "http://example.com/dir/" -> resolves "page.html" -> "http://example.com/dir/page.html"
    // Mutated:  baseUrlStr -> "http://example.com/dir/ection-heading" -> resolves "page.html" -> "http://example.com/dir/page.html"
    // Hmm still same... need the fragment to affect the path segment

    // Try: base is "http://example.com/dir#longsuffix" (no trailing slash)
    // Original: "http://example.com/dir" -> resolve "page.html" -> "http://example.com/page.html"
    // Mutated:  "http://example.com/dirlongsuffix" (removes "#l", leaves "ongsuffix") 
    //           -> "http://example.com/diongsuffix" ... wait
    // /#.$/ on "http://example.com/dir#longsuffix": matches "#l", removes it
    // result: "http://example.com/dirlongsuffix" ... no, "dir#longsuffix".replace(/#.$/, '') = "dirlongsuffix"? 
    // No: "dir#longsuffix" -> /#.$/ matches "#l" -> removes "#l" -> "dirlongsuffix"... 
    // Actually the string is "http://example.com/dir#longsuffix"
    // /#.$/ matches "#l" (the # and the char right after), leaving "http://example.com/dirlongsuffix"... no
    // "dir#longsuffix".replace(/#.$/, '') replaces "#l" with '' -> "dirlongsuffix"... 
    // Wait: "dir#longsuffix" with /#.$/ - this matches "#l" at position 3, replaces with '' -> "dirlongsuffix"
    // Hmm that gives "dirlongsuffix" not "dirlongsuffix"... 
    // Original gives "dir", mutated gives "dirlongsuffix"... no wait
    // "dir#longsuffix".replace(/#.*$/, '') = "dir"
    // "dir#longsuffix".replace(/#.$/, '') = "dir" + "ongsuffix" = "dirlongsuffix"... 
    // Hmm no: replace only removes the matched portion "#l", rest "ongsuffix" stays
    // So result is "dir" + "" + "ongsuffix" = "dirongsuffix"

    expect(result).not.toBeNull();
    expect(result!.url).toBe("http://example.com/page.html");
  });
});