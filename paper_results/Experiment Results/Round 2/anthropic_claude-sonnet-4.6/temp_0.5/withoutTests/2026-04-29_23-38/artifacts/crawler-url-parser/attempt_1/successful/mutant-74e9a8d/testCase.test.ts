import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype mutation detection", () => {
  it("should return 'internal' not 'sublevel' when linkurl path starts with same prefix as pageurl directory but is a different directory", () => {
    // pageurl is at /sub/default.html
    // After normalization: original replaces /default.html with /, giving /sub/
    //                      mutant replaces /default.html with "", giving /sub
    // linkurl is at /subother/page.html (different directory, not truly a sublevel)
    // With /sub/ as pageurl_path: /subother/page.html does NOT include /sub/ → "internal"
    // With /sub as pageurl_path: /subother/page.html DOES include /sub → "sublevel" (wrong)
    const result = gettype(
      "http://example.com/subother/page.html",
      "http://example.com/sub/default.html"
    );
    expect(result).toBe("internal");
  });
});