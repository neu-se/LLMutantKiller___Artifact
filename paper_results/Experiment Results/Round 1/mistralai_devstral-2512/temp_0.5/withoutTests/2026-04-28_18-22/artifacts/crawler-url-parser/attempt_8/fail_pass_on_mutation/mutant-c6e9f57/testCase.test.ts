import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function behavior", () => {
  it("should handle URLs consistently", () => {
    const url = "http://example.com/path";
    const result = parse(url);

    expect(result).not.toBeNull();
    // This test verifies basic parsing works
    expect(result?.url).toBe("http://example.com/path");
    expect(result?.protocol).toBe("http:");
    expect(result?.host).toBe("example.com");
  });
});