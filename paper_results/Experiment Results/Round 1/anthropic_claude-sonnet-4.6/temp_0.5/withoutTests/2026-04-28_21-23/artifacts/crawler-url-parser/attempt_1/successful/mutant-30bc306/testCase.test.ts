import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype with index.html normalization", () => {
  it("should normalize pageurl path with multi-letter extension like index.html and return sublevel", () => {
    // pageurl has /index.html which should be normalized to /
    // linkurl has /about which is one level deeper than /
    // Original: pageurl_path normalized to "/", linkurl_path = "/about"
    //   pageurl_parts = [], linkurl_parts = ["about"], diff = 1
    //   linkurl_path "/about" includes pageurl_path "/" => "sublevel"
    // Mutant: pageurl_path stays "/index.html", linkurl_path = "/about"
    //   pageurl_parts = ["index.html"], linkurl_parts = ["about"], diff = 0
    //   linkurl_without_last_part = "" == pageurl_without_last_part = "" => "samelevel"
    const result = gettype(
      "http://example.com/about",
      "http://example.com/index.html"
    );
    expect(result).toBe("sublevel");
  });
});