import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with protocol detection", () => {
  it("should handle URLs starting with a protocol-like pattern containing underscores", () => {
    const result = parse("_test:/example.com", "http://base.com");
    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://base.com/_test:/example.com");
  });
});