import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function", () => {
  it("should return null for URLs with illegal characters", () => {
    const result = parse("http://example.com/{invalid}");
    expect(result).toBeNull();
  });
});