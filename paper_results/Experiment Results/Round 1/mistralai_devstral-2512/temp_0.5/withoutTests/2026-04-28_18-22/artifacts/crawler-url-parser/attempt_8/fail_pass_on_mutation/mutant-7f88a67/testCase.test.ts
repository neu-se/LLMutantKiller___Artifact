import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("URL Parser - HTTPS Normalization", () => {
  it("should not normalize HTTPS to HTTP when normalizeHttps is false", () => {
    const httpsUrl = "https://www.example.com/path";
    const result = parse(httpsUrl);
    expect(result).not.toBeNull();
    expect(result!.protocol).toBe("https:");
    expect(result!.url).toBe("https://www.example.com/path");
    expect(result!.url).not.toBe("http://www.example.com/path");
  });
});