import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype function path normalization", () => {
  it("should treat paths ending with index.htm as their parent directory", () => {
    // When comparing a path ending with index.htm to its parent directory,
    // they should be considered the same level
    const result = gettype(
      "http://example.com/path/index.htm",
      "http://example.com/path/"
    );
    expect(result).toBe("samelevel");
  });
});