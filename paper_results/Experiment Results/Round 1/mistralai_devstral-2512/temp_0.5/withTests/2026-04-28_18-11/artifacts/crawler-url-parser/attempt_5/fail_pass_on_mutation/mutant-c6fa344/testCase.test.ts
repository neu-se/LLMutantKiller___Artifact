import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with protocol-less URL", () => {
  it("should handle URLs starting with protocol-like strings without ://", () => {
    const result = parse("httpexample.com/path");
    expect(result?.url).toBe("http://httpexample.com/path");
  });
});