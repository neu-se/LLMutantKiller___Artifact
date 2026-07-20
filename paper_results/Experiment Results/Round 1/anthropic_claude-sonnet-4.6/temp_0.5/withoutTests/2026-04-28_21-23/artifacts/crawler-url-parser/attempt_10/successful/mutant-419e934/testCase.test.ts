import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype with index page normalization", () => {
  it("should return uplevel when link path is suffix of page index path", () => {
    // linkurl_path: /b/ (1 part)
    // pageurl_path original: /a/b/ (from /a/b/index.html, 2 parts)
    // pageurl_path mutated: /a/b (from /a/b/index.html, 2 parts)
    // diff = -1 -> uplevel check
    // original: /a/b/.includes(/b/) = true -> uplevel
    // mutated: /a/b.includes(/b/) = false -> internal
    const result = gettype(
      "http://example.com/b/",
      "http://example.com/a/b/index.html"
    );
    expect(result).toBe("uplevel");
  });
});