import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function protocol normalization", () => {
  it("should preserve https protocol in the formatted URL when normalizeHttps is false", () => {
    const url = "https://example.com";
    const result = parse(url);
    expect(result).not.toBeNull();
    expect(result?.url).toBe("https://example.com/");
    expect(result?.url).not.toBe("http://example.com/");
  });
});