import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function protocol normalization", () => {
  it("should preserve https protocol when normalizeHttps is false", () => {
    const url = "https://example.com";
    const result = parse(url);
    expect(result).not.toBeNull();
    expect(result?.url).toBe("https://example.com/");
  });
});