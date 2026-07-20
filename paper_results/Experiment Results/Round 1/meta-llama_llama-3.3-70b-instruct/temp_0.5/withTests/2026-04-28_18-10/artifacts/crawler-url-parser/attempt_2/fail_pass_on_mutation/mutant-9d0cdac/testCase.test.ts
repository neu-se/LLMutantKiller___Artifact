import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
  it('should return the correct url when the input url is "http://www.google.com"', () => {
    const result = parse("http://www.google.com");
    expect(result).not.toBeNull();
    expect(result.url).toBe("http://www.google.com/");
  });

  it('should return null when the input url is "htp://www.google.com"', () => {
    const result = parse("htp://www.google.com");
    expect(result).toBeNull();
  });
});