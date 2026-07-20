import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with normalizeHttps option", () => {
  it("should not normalize https protocol when normalizeHttps is false", () => {
    const url = "https://example.com";
    const result = parse(url);
    expect(result.protocol).toBe("https:");
  });
});