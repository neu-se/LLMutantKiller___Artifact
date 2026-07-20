import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('crawler-url-parser', () => {
  it('should correctly parse URLs with fragments', () => {
    const originalUrl = "https://www.example.com/path#fragment123";
    const expectedUrl = "https://www.example.com/path";
    const parsedUrl = parse(originalUrl);
    expect(parsedUrl.url).toBe(expectedUrl);

    const mutatedUrl = "https://www.example.com/path#f";
    const expectedMutatedUrl = "https://www.example.com/path#f";
    const parsedMutatedUrl = parse(mutatedUrl);
    expect(parsedMutatedUrl.url).not.toBe(expectedMutatedUrl);
  });
});