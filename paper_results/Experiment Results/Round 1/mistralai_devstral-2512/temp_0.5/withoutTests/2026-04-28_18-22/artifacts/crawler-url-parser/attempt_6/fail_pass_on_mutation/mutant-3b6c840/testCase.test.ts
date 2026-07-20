import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function trailing slash handling", () => {
  it("should preserve trailing slashes in URLs", () => {
    const urlWithSlash = "http://example.com/path/";
    const result = parse(urlWithSlash);
    expect(result?.url).toBe("http://example.com/path/");
    expect(result?.path).toBe("/path/");
  });
});