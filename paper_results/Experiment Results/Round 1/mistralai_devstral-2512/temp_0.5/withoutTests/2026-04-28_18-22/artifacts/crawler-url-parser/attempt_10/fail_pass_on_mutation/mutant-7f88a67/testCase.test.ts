import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("URL Parser - HTTPS to HTTP Normalization", () => {
  it("should not convert HTTPS to HTTP when normalizeHttps is false", () => {
    const httpsUrl = "https://secure.example.com/path";
    const result = parse(httpsUrl);
    expect(result).not.toBeNull();
    expect(result!.protocol).toBe("https:");
    expect(result!.url).toBe("https://secure.example.com/path");
    expect(result!.url).not.toContain("http://");
  });
});