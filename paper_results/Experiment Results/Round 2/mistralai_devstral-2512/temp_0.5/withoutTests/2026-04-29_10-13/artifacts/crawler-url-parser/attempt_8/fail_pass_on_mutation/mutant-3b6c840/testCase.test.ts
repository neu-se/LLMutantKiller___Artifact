import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("URL parsing behavior", () => {
  it("should preserve trailing slashes in formatted URLs", () => {
    const url = "http://example.com/path/";
    const result = parse(url);
    // The mutation changes removeTrailingSlash from true to false
    // This should affect how URLs are formatted
    expect(result?.url).toBe("http://example.com/path/");
  });
});