import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with HTTPS normalization", () => {
  it("should not normalize HTTPS to HTTP when normalizeHttps is false", () => {
    const url = "https://example.com/path";
    const result = parse(url);
    expect(result).not.toBeNull();
    if (result) {
      expect(result.protocol).toBe("https:");
      expect(result.url).toBe("https://example.com/path");
    }
  });
});