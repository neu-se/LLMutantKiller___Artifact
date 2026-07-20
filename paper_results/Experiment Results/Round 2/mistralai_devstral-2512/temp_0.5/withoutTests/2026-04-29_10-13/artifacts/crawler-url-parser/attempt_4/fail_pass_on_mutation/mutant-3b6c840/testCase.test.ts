import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function trailing slash behavior", () => {
  it("should handle URLs with trailing slashes consistently", () => {
    const url = "http://example.com/path/";
    const result = parse(url);
    expect(result?.url).toBe("http://example.com/path/");
    expect(result?.path).toBe("/path/");
  });
});