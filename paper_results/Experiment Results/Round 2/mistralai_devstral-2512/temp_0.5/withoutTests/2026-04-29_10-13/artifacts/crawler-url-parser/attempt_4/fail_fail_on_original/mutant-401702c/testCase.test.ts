import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with protocol detection", () => {
  it("should handle URLs starting with a protocol-like pattern containing special characters", () => {
    const result = parse("file:/example.com", "http://base.com");
    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://base.com/file:/example.com");
  });
});