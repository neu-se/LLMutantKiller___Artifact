import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('crawler-url-parser', () => {
  it('should correctly parse URLs with fragments', () => {
    const url = "https://www.example.com/path#abcdef";
    const expectedUrl = "https://www.example.com/path";
    const parsedUrl = parse(url);
    expect(parsedUrl.url).toBe(expectedUrl);
  });
});