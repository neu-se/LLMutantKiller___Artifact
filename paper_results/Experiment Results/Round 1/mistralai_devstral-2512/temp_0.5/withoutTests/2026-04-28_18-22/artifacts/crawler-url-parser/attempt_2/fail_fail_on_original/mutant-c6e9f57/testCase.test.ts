import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with query parameter handling", () => {
  it("should remove UTM query parameters from URLs when normalization options are configured", () => {
    const url = "http://example.com/path?utm_source=test&ref=somevalue";
    const result = parse(url);

    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://example.com/path?ref=somevalue");
  });
});