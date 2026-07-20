import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("URL Parser - HTTPS Normalization Behavior", () => {
  it("should preserve HTTPS protocol when normalizeHttps is false", () => {
    const url = "https://example.com";
    const result = parse(url);
    expect(result).not.toBeNull();
    expect(result!.protocol).toBe("https:");
    expect(result!.url).toBe("https://example.com/");
  });
});