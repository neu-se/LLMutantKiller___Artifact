import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
  it('should correctly parse URLs starting with "//"', () => {
    const url = "//www.example.com";
    const result = parse(url);
    expect(result).not.toBeNull();
    expect(result.url.indexOf("http")).toBeLessThan(result.url.indexOf("://www"));
  });
});