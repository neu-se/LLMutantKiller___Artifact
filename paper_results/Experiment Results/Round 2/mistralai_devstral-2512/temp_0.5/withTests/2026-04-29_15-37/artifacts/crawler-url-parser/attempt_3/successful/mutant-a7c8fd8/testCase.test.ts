import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype mutation test", () => {
  it("should correctly handle paths with default.xy", () => {
    const result = gettype(
      "http://example.com/path/default.xy",
      "http://example.com/path/"
    );
    expect(result).toBe("samelevel");
  });
});