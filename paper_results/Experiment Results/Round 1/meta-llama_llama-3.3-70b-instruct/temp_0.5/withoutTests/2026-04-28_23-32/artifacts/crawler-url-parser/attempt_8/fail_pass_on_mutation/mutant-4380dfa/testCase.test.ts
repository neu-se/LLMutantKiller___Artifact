import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
  it('should handle protocol correctly', () => {
    const originalUrl = "//www.example.com/path";
    const result = parse(originalUrl);
    expect(result?.url).toEqual("http://www.example.com/path");
  });
});