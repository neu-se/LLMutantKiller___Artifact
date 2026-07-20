import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with protocol-less URL mutation test", () => {
  it("should correctly handle URLs starting with protocol-like strings without slashes", () => {
    const result = parse("http:example.com/path");
    expect(result).not.toBeNull();
    expect(result?.url).toBe("http:example.com/path");
    expect(result?.protocol).toBe("http:");
    expect(result?.host).toBeNull();
    expect(result?.path).toBe("example.com/path");
  });
});