import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype with default page normalization", () => {
  it("should classify a link as sublevel when page URL contains /default.html", () => {
    // pageurl has /default.html which should be normalized to /
    // linkurl has /about/ which is one level deep from root
    // After normalization: pageurl_path = "/" and linkurl_path = "/about/"
    // part_count_diff = 1 - 0 = 1, and linkurl_path "/about/" includes pageurl_path "/"
    // So result should be "sublevel"
    // With mutation: pageurl_path stays "/default.html", parts = ["default.html"]
    // part_count_diff = 1 - 1 = 0, paths won't match as samelevel, returns "internal"
    const result = gettype(
      "http://example.com/about/",
      "http://example.com/default.html"
    );
    expect(result).toBe("sublevel");
  });
});