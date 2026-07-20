import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function URL protocol prepending", () => {
  it("should return a valid result for a URL with http:// protocol when no base URL is provided", () => {
    const result = parse("http://example.com/page");
    expect(result).not.toBeNull();
    expect(result?.url).toContain("http://example.com");
    expect(result?.protocol).toBe("http:");
    expect(result?.host).toBe("example.com");
  });
});