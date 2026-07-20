import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
  it('should parse URL correctly', () => {
    const url = "//www.stackoverflow.com";
    const result = parse(url);
    expect(result.url).toBe("http://www.stackoverflow.com/");
  });
});