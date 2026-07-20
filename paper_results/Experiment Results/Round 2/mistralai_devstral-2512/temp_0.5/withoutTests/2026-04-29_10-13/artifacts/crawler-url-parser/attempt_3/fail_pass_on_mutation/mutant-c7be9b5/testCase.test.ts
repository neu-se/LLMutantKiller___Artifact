import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function", () => {
  it("should handle URLs with illegal characters by returning null", () => {
    const urlWithIllegalChars = "http://example.com/{{invalid}}";
    const result = parse(urlWithIllegalChars);
    expect(result).toBeNull();
  });
});