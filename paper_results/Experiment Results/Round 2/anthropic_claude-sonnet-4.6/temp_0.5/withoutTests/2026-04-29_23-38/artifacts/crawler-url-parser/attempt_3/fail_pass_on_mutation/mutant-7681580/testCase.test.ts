import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function URL protocol prepending", () => {
  it("should correctly handle https:// URLs without a base URL", () => {
    const result = parse("https://example.com/path");
    expect(result).not.toBeNull();
    expect(result?.url).toContain("https://example.com");
    expect(result?.protocol).toBe("https:");
    expect(result?.host).toBe("example.com");
    expect(result?.path).toBe("/path");
  });
});