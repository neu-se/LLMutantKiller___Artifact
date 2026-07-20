import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with query parameters", () => {
  it("should handle URLs with utm_ parameters containing alphanumeric characters", () => {
    const url = "https://example.com/path?utm_source=test123&ref=abc";
    const result = parse(url);
    expect(result?.url).toBe("https://example.com/path?ref=abc");
  });
});