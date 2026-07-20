import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype with default page normalization", () => {
  it("should treat /default.html as equivalent to / when comparing paths", () => {
    // pageurl has /default.html which should be normalized to /
    // linkurl is just the root /
    // With original code: pageurl_path becomes "/" and linkurl_path is "/"
    // part_count_diff = 0, both without_last_part are "", so returns "samelevel"
    // With mutated code: pageurl_path stays "/default.html" (extension > 1 char)
    // part_count_diff = 0 - 1 = -1, checks if pageurl_path includes linkurl_path
    // "/default.html".includes("/") is true, returns "uplevel" instead
    const result = gettype(
      "http://example.com/",
      "http://example.com/default.html"
    );
    expect(result).toBe("samelevel");
  });
});