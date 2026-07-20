import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse with base url slashesDenoteHost effect', () => {
  it('should correctly resolve relative url when base url has query parameters and relative path', () => {
    // Use a base URL with query params - when parseQueryString=true and slashesDenoteHost differs,
    // URL.format output may differ, affecting URL.resolve
    const result = parse("ddd", "http://www.stackoverflow.com/aaa/bbb?q=1");
    expect(result).not.toBeNull();
    expect(result!.url).toBe("http://www.stackoverflow.com/aaa/ddd");
  });
});