import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with query parameters", () => {
  it("should remove utm_ parameters with alphanumeric characters but keep those with non-word characters", () => {
    const url = "http://example.com/path?utm_source=test&utm_medium=email@test&ref=abc";
    const result = parse(url);
    expect(result).not.toBeNull();
    if (result) {
      expect(result.url).not.toContain("utm_source=test");
      expect(result.url).toContain("utm_medium=email@test");
      expect(result.url).toContain("ref=abc");
    }
  });
});