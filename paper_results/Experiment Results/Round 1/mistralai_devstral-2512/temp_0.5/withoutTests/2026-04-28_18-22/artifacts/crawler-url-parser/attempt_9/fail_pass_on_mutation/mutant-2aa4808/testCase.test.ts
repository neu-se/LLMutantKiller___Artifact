import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with base URL", () => {
  it("should correctly parse relative URLs when base URL contains a query parameter that needs decoding", () => {
    const baseUrl = "http://example.com/path?param=%2Fvalue%2F";
    const relativeUrl = "relative";
    const result = parse(relativeUrl, baseUrl);

    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://example.com/relative");
    expect(result?.baseurl).toBe("http://example.com/path?param=%2Fvalue%2F");
  });
});