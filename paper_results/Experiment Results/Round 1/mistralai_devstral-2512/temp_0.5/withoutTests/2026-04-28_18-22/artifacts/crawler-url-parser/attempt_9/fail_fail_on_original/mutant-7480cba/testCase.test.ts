import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with relative URLs", () => {
  it("should correctly handle URLs starting with protocol-like strings that should be prefixed with http://", () => {
    const result = parse("ftp:example.com", undefined);
    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://ftp:example.com");
    expect(result?.protocol).toBe("http:");
    expect(result?.host).toBe("ftp:example.com");
  });
});