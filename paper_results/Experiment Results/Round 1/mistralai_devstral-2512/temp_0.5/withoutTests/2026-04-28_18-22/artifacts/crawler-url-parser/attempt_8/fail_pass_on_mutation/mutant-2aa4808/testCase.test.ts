import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with base URL", () => {
  it("should correctly handle base URLs with authentication and query parameters when parsing relative URLs", () => {
    const baseUrl = "http://user:pass@example.com/path?query=value";
    const relativeUrl = "relative";
    const result = parse(relativeUrl, baseUrl);

    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://user:pass@example.com/relative");
    expect(result?.baseurl).toBe("http://user:pass@example.com/path?query=value");
  });
});