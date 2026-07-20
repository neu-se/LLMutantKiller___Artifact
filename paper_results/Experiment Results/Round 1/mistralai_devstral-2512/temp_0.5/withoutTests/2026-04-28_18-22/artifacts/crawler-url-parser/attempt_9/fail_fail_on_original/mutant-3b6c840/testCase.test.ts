import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function trailing slash behavior", () => {
  it("should remove trailing slashes from URLs when removeTrailingSlash is true", () => {
    const urlWithTrailingSlash = "http://example.com/path/";
    const result = parse(urlWithTrailingSlash);
    // This test expects the trailing slash to be removed
    // which would be the case when removeTrailingSlash is true (original version)
    // but would fail when removeTrailingSlash is false (mutated version)
    expect(result?.url).toBe("http://example.com/path");
  });
});