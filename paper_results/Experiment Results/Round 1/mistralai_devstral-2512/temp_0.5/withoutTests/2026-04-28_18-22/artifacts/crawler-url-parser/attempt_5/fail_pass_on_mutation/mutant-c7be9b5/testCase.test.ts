import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function", () => {
  it("should handle URLs with illegal characters correctly", () => {
    const url = "https://www.example.com/<script>";
    const result = parse(url);
    expect(result).toBeNull();
  });
});