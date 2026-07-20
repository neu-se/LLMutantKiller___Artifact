import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with stripWWW option", () => {
  it("should handle URLs with and without 'www.' differently based on stripWWW setting", () => {
    const urlWithWWW = "http://www.example.com/path";
    const result = parse(urlWithWWW);
    // This test will pass when stripWWW is true (original) and fail when false (mutated)
    expect(result?.host).not.toContain("www.");
  });
});