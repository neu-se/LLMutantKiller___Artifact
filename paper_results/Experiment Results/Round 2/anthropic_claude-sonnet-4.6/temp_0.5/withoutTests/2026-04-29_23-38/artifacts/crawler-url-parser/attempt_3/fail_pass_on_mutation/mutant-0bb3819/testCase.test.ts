import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype with default path normalization", () => {
  it("should return sublevel when linkurl ends with /default.html and is one level deeper than pageurl", () => {
    const result = gettype(
      "http://example.com/aaa/bbb/ccc/default.html",
      "http://example.com/aaa/bbb/"
    );
    expect(result).toBe("sublevel");
  });
});