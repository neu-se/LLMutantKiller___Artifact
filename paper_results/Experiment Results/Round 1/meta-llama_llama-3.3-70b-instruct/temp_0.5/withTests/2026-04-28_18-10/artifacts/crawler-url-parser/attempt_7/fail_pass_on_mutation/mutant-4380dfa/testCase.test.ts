import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
  it('should parse URL correctly', () => {
    const url = "ddd";
    const result = parse(url);
    expect(result.url).toBe("http://ddd/");
  });
});