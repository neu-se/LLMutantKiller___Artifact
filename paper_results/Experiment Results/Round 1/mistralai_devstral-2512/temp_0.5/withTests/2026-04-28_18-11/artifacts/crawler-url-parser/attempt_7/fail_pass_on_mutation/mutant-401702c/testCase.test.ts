import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with protocol detection", () => {
  it("should correctly handle URLs starting with protocol-like patterns", () => {
    const result = parse("http:example.com");
    expect(result).not.toBeNull();
    expect(result?.url).toBe("http:example.com");
    expect(result?.protocol).toBe("http:");
    expect(result?.host).toBeNull();
  });
});