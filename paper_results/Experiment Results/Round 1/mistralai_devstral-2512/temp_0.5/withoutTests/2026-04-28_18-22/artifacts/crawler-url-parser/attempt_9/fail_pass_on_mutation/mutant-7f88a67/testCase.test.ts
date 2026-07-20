import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("URL Parser - HTTPS Normalization", () => {
  it("should preserve HTTPS protocol when normalizeHttps is false", () => {
    const httpsUrl = "https://example.com";
    const result = parse(httpsUrl);
    expect(result).not.toBeNull();
    expect(result!.protocol).toBe("https:");
    expect(result!.url).toBe("https://example.com/");
    expect(result!.url).not.toMatch(/^http:/);
  });
});