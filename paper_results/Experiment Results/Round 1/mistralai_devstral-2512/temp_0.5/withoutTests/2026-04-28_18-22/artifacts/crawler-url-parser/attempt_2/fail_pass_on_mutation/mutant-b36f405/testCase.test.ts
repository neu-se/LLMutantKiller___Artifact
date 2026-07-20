import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with query parameters", () => {
  it("should handle URLs with utm_ parameters containing special characters", () => {
    const url = "https://example.com/path?utm_source=test&ref=abc";
    const result = parse(url);
    expect(result?.url).toContain("utm_source=test");
  });
});