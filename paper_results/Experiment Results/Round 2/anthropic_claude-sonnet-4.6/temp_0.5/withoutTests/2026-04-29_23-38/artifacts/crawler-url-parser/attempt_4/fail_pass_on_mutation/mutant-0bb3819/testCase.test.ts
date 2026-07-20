import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype with default path normalization", () => {
  it("should return sublevel when both urls end with default.html and link is one level deeper", () => {
    const result = gettype(
      "http://example.com/aaa/bbb/default.html",
      "http://example.com/aaa/default.html"
    );
    expect(result).toBe("sublevel");
  });
});