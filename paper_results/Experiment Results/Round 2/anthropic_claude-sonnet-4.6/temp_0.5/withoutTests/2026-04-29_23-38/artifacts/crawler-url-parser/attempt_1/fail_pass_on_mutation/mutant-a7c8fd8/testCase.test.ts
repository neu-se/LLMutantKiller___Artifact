import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype with default.html path normalization", () => {
  it("should normalize /default.html to / and correctly classify a sublevel link", () => {
    // pageurl has /default.html which should be normalized to /
    // linkurl has /about which is one level deeper than /
    // With original code: pageurl_path becomes "/" (0 parts), linkurl_path is "/about" (1 part)
    // diff = 1 - 0 = 1, and "/about".includes("/") is true => "sublevel"
    // With mutated code: pageurl_path stays "/default.html" (1 part), linkurl_path is "/about" (1 part)
    // diff = 0, both without last part are "", so => "samelevel"
    const result = gettype(
      "http://example.com/about",
      "http://example.com/default.html"
    );
    expect(result).toBe("sublevel");
  });
});