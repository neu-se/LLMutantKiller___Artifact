import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function trailing slash behavior", () => {
  it("should preserve trailing slash when removeTrailingSlash is false", () => {
    const urlWithTrailingSlash = "http://example.com/path/";
    const result = parse(urlWithTrailingSlash);
    expect(result?.url).toBe("http://example.com/path/");
    expect(result?.path).toBe("/path/");
  });
});