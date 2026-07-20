import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with protocol handling", () => {
  it("should reject URLs with single character protocol followed by colon when base URL is provided", () => {
    const result = parse("h:test", "http://example.com");
    expect(result).toBeNull();
  });
});