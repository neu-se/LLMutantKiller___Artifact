import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with base URL", () => {
  it("should correctly handle base URLs with query parameters when resolving relative URLs with query parameters", () => {
    const baseUrl = "http://example.com/base?baseParam=value";
    const relativeUrl = "path?relParam=value";
    const result = parse(relativeUrl, baseUrl);

    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://example.com/path?relParam=value");
    expect(result?.search).toBe("?relParam=value");
    expect(result?.querycount).toBe(1);
  });
});