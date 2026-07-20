import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with base URL query parameters", () => {
  it("should correctly parse relative URLs when base URL contains query parameters that should be stripped", () => {
    const baseUrl = "http://example.com/path?utm_source=test";
    const relativeUrl = "relative";
    const result = parse(relativeUrl, baseUrl);

    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://example.com/relative");
    expect(result?.search).toBeNull();
    expect(result?.querycount).toBe(0);
  });
});