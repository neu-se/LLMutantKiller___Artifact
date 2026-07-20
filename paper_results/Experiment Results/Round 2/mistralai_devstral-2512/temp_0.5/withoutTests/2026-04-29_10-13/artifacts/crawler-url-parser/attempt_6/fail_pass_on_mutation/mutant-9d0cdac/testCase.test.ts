import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function protocol validation", () => {
  it("should reject URLs with invalid protocol format when base URL is provided", () => {
    const result = parse("x:invalid", "http://example.com");
    expect(result).toBeNull();
  });
});