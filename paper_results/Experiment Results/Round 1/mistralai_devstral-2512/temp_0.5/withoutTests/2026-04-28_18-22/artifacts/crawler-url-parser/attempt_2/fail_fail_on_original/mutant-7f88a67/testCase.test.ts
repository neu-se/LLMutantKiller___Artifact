import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("URL Parser - HTTPS Normalization", () => {
  it("should not normalize HTTPS to HTTP when normalizeHttps is false", () => {
    const url = "https://www.example.com";
    const result = parse(url);
    expect(result.url).toBe("https://www.example.com");
    expect(result.protocol).toBe("https:");
  });
});