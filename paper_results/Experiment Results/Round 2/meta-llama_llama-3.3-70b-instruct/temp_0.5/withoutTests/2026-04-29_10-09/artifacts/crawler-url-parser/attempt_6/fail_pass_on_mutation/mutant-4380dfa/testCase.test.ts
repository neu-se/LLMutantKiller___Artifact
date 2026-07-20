import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
  it('should correctly parse URLs starting with "//"', () => {
    const url = "//www.example.com";
    const resultOriginal = parse(url);
    expect(resultOriginal).not.toBeNull();
    expect(resultOriginal.url.substring(0, 7)).toBe("http://");
    const url2 = "http://www.example.com";
    const result2 = parse(url2);
    expect(result2).not.toBeNull();
    expect(result2.url).not.toBe(url);
  });
});