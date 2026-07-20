import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype function with directory index handling", () => {
  it("should correctly identify samelevel when comparing paths with default.htm", () => {
    const result = gettype(
      "http://example.com/path/default.htm",
      "http://example.com/path/"
    );
    expect(result).toBe("samelevel");
  });
});