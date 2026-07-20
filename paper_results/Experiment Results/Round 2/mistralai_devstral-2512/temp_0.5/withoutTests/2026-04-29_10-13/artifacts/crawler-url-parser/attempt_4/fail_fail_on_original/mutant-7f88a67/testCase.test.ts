import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with normalizeHttps option", () => {
  it("should preserve https protocol when normalizeHttps is false", () => {
    const url = "https://www.example.com";
    const result = parse(url);
    expect(result.protocol).toBe("https:");
    expect(result.url).toBe("https://example.com/");
  });
});