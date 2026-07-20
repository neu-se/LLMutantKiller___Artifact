import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
  it('should parse URL correctly', () => {
    const url = "//";
    const baseUrl = "";
    const result = parse(url, baseUrl);
    expect(result.url).toBe("http://");
  });
});