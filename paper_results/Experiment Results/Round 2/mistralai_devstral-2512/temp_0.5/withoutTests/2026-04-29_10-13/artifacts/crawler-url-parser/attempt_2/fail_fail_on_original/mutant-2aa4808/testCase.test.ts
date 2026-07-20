import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with base URL", () => {
  it("should correctly handle relative URLs with query parameters when base URL has a search component", () => {
    const baseUrl = "http://example.com/path?query=value";
    const relativeUrl = "subpath";
    const result = parse(relativeUrl, baseUrl);

    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://example.com/subpath");
    expect(result?.search).toBe("");
    expect(result?.querycount).toBe(0);
  });
});