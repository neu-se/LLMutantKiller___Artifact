import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function trailing slash behavior", () => {
  it("should preserve trailing slashes in URLs when removeTrailingSlash is false", () => {
    const urlWithTrailingSlash = "http://example.com/path/";
    const result = parse(urlWithTrailingSlash);
    // This test expects the trailing slash to be preserved
    // which would be the case when removeTrailingSlash is false (mutated version)
    // but fails when removeTrailingSlash is true (original version)
    expect(result?.url).toBe("http://example.com/path/");
  });
});