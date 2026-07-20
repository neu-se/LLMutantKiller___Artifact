import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse with base url containing port', () => {
  it('should resolve relative url against base url with port', () => {
    const result = parse("ddd", "http://www.example.com:8080/path/");
    expect(result).not.toBeNull();
    expect(result!.url).toBe("http://www.example.com:8080/path/ddd");
    expect(result!.host).toBe("www.example.com:8080");
  });
});