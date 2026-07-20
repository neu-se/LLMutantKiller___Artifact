import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("URL Parser - HTTPS Normalization", () => {
  it("should not normalize HTTPS to HTTP when normalizeHttps is false", () => {
    const url = "https://www.example.com/path";
    const result = parse(url);
    expect(result).not.toBeNull();
    expect(result!.url).toBe("https://www.example.com/path");
    expect(result!.protocol).toBe("https:");
  });
});