import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function protocol validation", () => {
  it("should reject URLs with single-character protocols when base URL is provided", () => {
    const result = parse("a:test", "http://example.com");
    expect(result).toBeNull();
  });
});