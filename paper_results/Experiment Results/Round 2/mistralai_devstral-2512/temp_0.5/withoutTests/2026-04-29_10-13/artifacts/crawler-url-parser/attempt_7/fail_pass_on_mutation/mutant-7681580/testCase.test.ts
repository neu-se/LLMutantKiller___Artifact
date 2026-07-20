import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function", () => {
  it("should correctly handle URLs without protocol but with path starting after domain", () => {
    const result = parse("example.com:8080/path");
    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://example.com:8080/path");
    expect(result?.protocol).toBe("http:");
    expect(result?.host).toBe("example.com:8080");
  });
});