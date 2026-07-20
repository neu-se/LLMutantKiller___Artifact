import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("Trailing slash normalization behavior", () => {
  it("should keep trailing slash when removeTrailingSlash is false", () => {
    const result = parse("http://example.com/path/");
    expect(result?.url).toBe("http://example.com/path/");
  });
});