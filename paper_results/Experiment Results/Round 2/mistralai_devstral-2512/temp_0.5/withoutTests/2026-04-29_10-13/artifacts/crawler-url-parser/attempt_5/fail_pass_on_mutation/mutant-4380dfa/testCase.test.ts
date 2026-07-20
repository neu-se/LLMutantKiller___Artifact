import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with protocol-less URLs", () => {
  it("should add http:// to protocol-less URLs starting with //", () => {
    const result = parse("//example.com/path");
    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://example.com/path");
    expect(result?.protocol).toBe("http:");
    expect(result?.host).toBe("example.com");
    expect(result?.path).toBe("/path");
  });
});