import { parse, gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype normalization", () => {
  it("should return uplevel when both link and page are index files and link is parent", () => {
    // linkurl_path: /section/index.html -> /section/ (linkurl replace always uses '/')
    // pageurl_path original: /section/sub/index.html -> /section/sub/
    // pageurl_path mutated: /section/sub/index.html -> /section/sub
    // diff = 1 - 2 = -1 (uplevel check)
    // original: /section/sub/.includes(/section/) = true -> "uplevel"
    // mutated: /section/sub.includes(/section/) = false -> "internal"
    const result = gettype(
      "http://example.com/section/index.html",
      "http://example.com/section/sub/index.html"
    );
    expect(result).toBe("uplevel");
  });
});