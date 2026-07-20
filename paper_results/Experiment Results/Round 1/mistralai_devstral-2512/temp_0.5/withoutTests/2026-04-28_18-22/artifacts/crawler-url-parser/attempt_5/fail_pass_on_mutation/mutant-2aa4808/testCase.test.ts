import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with base URL", () => {
  it("should correctly parse relative URLs when base URL contains a query string with special characters", () => {
    const baseUrl = "http://example.com/path?query=value&special=char%20test";
    const relativeUrl = "relative";
    const result = parse(relativeUrl, baseUrl);

    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://example.com/relative");
    expect(result?.baseurl).toBe("http://example.com/path?query=value&special=char%20test");
  });
});