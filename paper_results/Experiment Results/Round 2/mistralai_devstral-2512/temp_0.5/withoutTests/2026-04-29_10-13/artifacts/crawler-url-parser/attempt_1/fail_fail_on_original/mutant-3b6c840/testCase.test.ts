import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function trailing slash behavior", () => {
  it("should remove trailing slash from URL when removeTrailingSlash is true", () => {
    const urlWithTrailingSlash = "http://example.com/path/";
    const result = parse(urlWithTrailingSlash);
    expect(result?.url).toBe("http://example.com/path");
    expect(result?.path).toBe("/path");
  });
});