import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype with default.[extension] path normalization", () => {
  it("should treat /default.html as same level as the root page", () => {
    // linkurl_path = "/default.html" should be normalized to "/"
    // pageurl_path = "/" stays as "/"
    // After normalization both are "/", so they should be "samelevel"
    // In the mutated code, /default\.[a-z]$/ only matches single char extensions,
    // so "/default.html" (4 chars) won't be normalized, causing different behavior
    const result = gettype(
      "http://example.com/default.html",
      "http://example.com/"
    );
    expect(result).toBe("samelevel");
  });
});