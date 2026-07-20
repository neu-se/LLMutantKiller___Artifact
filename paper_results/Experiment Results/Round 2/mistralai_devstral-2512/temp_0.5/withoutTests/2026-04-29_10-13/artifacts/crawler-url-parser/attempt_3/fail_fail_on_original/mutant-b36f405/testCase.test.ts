import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with query parameters", () => {
  it("should remove utm_ query parameters with alphanumeric characters but keep those with special characters", () => {
    const url = "http://example.com/path?utm_source=test&utm_medium=email&utm_campaign=test123&ref=abc";
    const result = parse(url);
    expect(result).not.toBeNull();
    if (result) {
      expect(result.url).toBe("http://example.com/path?ref=abc");
    }
  });
});