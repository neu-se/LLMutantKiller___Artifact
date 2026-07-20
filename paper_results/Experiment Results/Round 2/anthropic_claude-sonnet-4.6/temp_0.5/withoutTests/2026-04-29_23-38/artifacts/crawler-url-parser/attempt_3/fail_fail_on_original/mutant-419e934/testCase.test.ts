import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype mutation detection", () => {
  it("should return internal when link path does not include pageurl path with trailing slash after index.html removal", () => {
    const result = gettype(
      "http://example.com/aaa/bbb",
      "http://example.com/aaa/index.html"
    );
    expect(result).toBe("internal");
  });
});