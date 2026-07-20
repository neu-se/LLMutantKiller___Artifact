import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with protocol-less URL", () => {
  it("should handle URLs starting with protocol-like strings without ://", () => {
    const result = parse("http:example.com");
    expect(result?.url).toBe("http:example.com");
  });
});