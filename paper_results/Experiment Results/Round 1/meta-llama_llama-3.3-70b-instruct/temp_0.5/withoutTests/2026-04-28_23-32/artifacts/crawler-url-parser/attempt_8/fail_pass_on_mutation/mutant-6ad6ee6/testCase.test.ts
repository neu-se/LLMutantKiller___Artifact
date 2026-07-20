import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('crawler-url-parser', () => {
  it('should correctly parse URLs with fragments', () => {
    const url = "https://www.example.com/path#ab";
    const expectedUrl = "https://www.example.com/path";
    const parsedUrl = parse(url);
    expect(parsedUrl.url).toBe(expectedUrl);
    const url2 = "https://www.example.com/path#a";
    const expectedUrl2 = "https://www.example.com/path";
    const parsedUrl2 = parse(url2);
    expect(parsedUrl2.url).toBe(expectedUrl2);
  });
});