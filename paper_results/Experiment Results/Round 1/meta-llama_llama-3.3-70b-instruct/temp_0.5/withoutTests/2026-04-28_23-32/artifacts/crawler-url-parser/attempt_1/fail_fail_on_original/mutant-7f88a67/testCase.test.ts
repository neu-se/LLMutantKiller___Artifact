import { parse } from "../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("crawler-url-parser", () => {
  it("should not normalize https protocol when normalizeHttps is false", () => {
    const url = "https://www.example.com";
    const result = parse(url);
    expect(result.protocol).toBe("https:");
  });
});