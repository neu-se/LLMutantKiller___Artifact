import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype function with directory index handling", () => {
  it("should correctly identify samelevel when comparing paths with index.html", () => {
    const result = gettype(
      "http://example.com/path/index.html",
      "http://example.com/path/"
    );
    expect(result).toBe("samelevel");
  });
});