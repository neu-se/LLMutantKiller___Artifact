import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with query parameters", () => {
  it("should handle URLs with utm_ parameters containing special characters", () => {
    const url = "http://example.com/path?utm_source=test&utm_medium=email@test&ref=abc";
    const result = parse(url);
    expect(result).not.toBeNull();
    if (result) {
      expect(result.url).toContain("utm_source=test");
      expect(result.url).toContain("utm_medium=email@test");
    }
  });
});