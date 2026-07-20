import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with baseUrlStr containing fragment", () => {
  it("should strip multi-character fragments from baseUrlStr when resolving relative URLs", () => {
    // baseUrlStr has a fragment with multiple characters after #
    // Original code: baseUrlStr.replace(/#.*$/, '') strips the entire fragment
    // Mutated code: baseUrlStr.replace(/#.$/, '') only strips # + one char, leaving the rest
    const baseUrlStr = "http://www.example.com/path/#section-heading";
    const relativeUrl = "page.html";

    const result = parse(relativeUrl, baseUrlStr);

    // The result should be a valid URL resolved against the base URL without fragment
    // Original: base becomes "http://www.example.com/path/" -> resolves to "http://www.example.com/path/page.html"
    // Mutated: base becomes "http://www.example.com/path/#section-headin" (only last char stripped)
    //          which may cause incorrect resolution or a different URL
    expect(result).not.toBeNull();
    expect(result!.url).toBe("http://www.example.com/path/page.html");
  });
});