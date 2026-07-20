import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function trailing slash behavior", () => {
  it("should preserve trailing slashes in URLs", () => {
    const urlWithTrailingSlash = "http://example.com/path/";
    const result = parse(urlWithTrailingSlash);
    // This test expects the trailing slash to be preserved
    // which matches the current behavior (since removeTrailingSlash is not being used)
    expect(result?.url).toBe("http://example.com/path/");
  });
});