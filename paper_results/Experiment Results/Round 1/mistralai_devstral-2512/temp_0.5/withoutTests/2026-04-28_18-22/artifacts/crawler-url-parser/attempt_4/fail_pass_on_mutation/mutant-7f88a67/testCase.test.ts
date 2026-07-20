import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("URL Parser - HTTPS to HTTP Normalization", () => {
  it("should not convert HTTPS to HTTP when normalizeHttps is false", () => {
    const httpsUrl = "https://www.example.com/path";
    const result = parse(httpsUrl);
    expect(result).not.toBeNull();
    expect(result!.url).toBe("https://www.example.com/path");
    expect(result!.protocol).toBe("https:");
    expect(result!.url).not.toBe("http://www.example.com/path");
  });
});