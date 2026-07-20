import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
  it('should correctly parse URLs starting with "//"', () => {
    const url = "//www.example.com";
    const result = parse(url);
    expect(result).not.toBeNull();
    expect(result.url.startsWith("http:")).toBe(true);
    expect(result.url.startsWith("//")).toBe(false);
  });
});