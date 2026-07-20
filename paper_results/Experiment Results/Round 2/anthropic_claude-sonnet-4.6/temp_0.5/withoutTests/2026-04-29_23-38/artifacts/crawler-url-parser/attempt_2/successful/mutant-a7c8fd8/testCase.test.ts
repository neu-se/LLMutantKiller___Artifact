import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype with default.html linkurl path normalization", () => {
  it("should normalize linkurl /default.html to / and correctly classify as uplevel", () => {
    // linkurl has /default.html which should be normalized to /
    // pageurl has /about/ which is one level deeper than /
    // With original code: linkurl_path becomes "/" (0 parts), pageurl has 1 part
    // diff = 0 - 1 = -1, and "/about/".includes("/") is true => "uplevel"
    // With mutated code: linkurl_path stays "/default.html" (1 part), pageurl has 1 part
    // diff = 0, both without last part are "", so => "samelevel"
    const result = gettype(
      "http://example.com/default.html",
      "http://example.com/about/"
    );
    expect(result).toBe("uplevel");
  });
});