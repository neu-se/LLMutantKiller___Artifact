import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("URL parsing with trailing slashes", () => {
  it("should preserve trailing slashes in URLs when removeTrailingSlash is false", () => {
    const urlWithSlash = "http://example.com/path/";
    const result = parse(urlWithSlash);
    expect(result?.url).toBe("http://example.com/path/");
    expect(result?.path).toBe("/path/");
  });
});