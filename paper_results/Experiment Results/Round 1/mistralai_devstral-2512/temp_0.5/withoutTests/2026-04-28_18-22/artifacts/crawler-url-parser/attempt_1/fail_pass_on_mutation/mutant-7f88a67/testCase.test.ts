import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("URL Parser - Protocol Normalization", () => {
  it("should preserve HTTPS protocol when normalizeHttps is false", () => {
    const url = "https://example.com/path";
    const result = parse(url);
    expect(result.protocol).toBe("https:");
    expect(result.url).toBe("https://example.com/path");
  });
});