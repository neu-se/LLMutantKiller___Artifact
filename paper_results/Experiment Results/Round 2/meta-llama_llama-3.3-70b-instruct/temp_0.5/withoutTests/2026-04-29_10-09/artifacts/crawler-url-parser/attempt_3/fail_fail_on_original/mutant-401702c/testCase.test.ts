import { parse } from "../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('crawler-url-parser', () => {
  it('should correctly handle URLs with special characters', () => {
    const url = "!example.com";
    const result = parse(url);
    expect(result).toBeNull();
  });
});