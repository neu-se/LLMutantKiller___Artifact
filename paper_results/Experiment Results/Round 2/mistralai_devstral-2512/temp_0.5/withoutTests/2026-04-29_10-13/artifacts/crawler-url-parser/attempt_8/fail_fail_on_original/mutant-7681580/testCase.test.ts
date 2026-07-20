import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function", () => {
  it("should correctly handle URLs starting with protocol-like prefix but no actual protocol", () => {
    const result = parse("http:example.com/path");
    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://http:example.com/path");
    expect(result?.protocol).toBe("http:");
    expect(result?.host).toBe("http:example.com");
  });
});