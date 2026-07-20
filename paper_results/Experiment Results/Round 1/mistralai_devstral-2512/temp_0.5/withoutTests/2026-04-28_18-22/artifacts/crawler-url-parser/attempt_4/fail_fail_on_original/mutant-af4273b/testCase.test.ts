import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with base URL query parameters", () => {
  it("should preserve query parameters from base URL when parsing relative URLs", () => {
    const baseUrl = "http://example.com/path?key=value";
    const relativeUrl = "relative";
    const result = parse(relativeUrl, baseUrl);

    expect(result).not.toBeNull();
    expect(result?.url).toContain("key=value");
    expect(result?.search).not.toBeNull();
    expect(result?.querycount).toBeGreaterThan(0);
  });
});