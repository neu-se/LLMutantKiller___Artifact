import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with protocol detection", () => {
  it("should handle URLs starting with a protocol-like pattern containing special characters", () => {
    const result = parse("!test:/example.com");
    expect(result).not.toBeNull();
    expect(result?.protocol).toBe("http:");
    expect(result?.host).toBe("!test");
    expect(result?.path).toBe("/example.com");
  });
});