import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse", () => {
  it("should parse localhost URL without protocol", () => {
    const result = parse("localhost://example.com");
    expect(result).not.toBeNull();
    expect(result?.protocol).toBe("localhost:");
  });
});