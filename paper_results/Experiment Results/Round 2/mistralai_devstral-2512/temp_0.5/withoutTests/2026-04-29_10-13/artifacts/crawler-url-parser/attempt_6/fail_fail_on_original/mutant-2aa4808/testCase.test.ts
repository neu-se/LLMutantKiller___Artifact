import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with base URL", () => {
  it("should correctly preserve query parameters from base URL when resolving relative URLs", () => {
    const baseUrl = "http://example.com/base/path?query=value";
    const relativeUrl = "relative/path";
    const result = parse(relativeUrl, baseUrl);

    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://example.com/base/relative/path?query=value");
    expect(result?.search).toBe("?query=value");
    expect(result?.querycount).toBe(1);
  });
});