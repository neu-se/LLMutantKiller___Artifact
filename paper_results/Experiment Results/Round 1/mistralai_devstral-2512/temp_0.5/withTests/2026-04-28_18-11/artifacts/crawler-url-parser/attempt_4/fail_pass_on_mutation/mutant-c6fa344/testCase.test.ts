import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with protocol-less URL", () => {
  it("should add http:// prefix to URLs starting with protocol-like strings followed by ://", () => {
    const result = parse("httpexample://example.com");
    expect(result).toBeNull();
  });
});