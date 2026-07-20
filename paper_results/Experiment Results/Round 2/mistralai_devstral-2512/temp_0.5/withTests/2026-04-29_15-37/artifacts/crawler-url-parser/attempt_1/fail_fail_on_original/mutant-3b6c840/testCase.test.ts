import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("Trailing slash normalization behavior", () => {
  it("should remove trailing slash from URLs when removeTrailingSlash is true", () => {
    const result = parse("http://example.com/path/");
    expect(result.url).toBe("http://example.com/path");
  });
});