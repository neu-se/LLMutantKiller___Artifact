import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with query parameters", () => {
  it("should remove utm_ query parameters with alphanumeric characters", () => {
    const url = "https://example.com/path?utm_source=test&ref=abc";
    const result = parse(url);
    expect(result.url).toBe("https://example.com/path?ref=abc");
  });
});