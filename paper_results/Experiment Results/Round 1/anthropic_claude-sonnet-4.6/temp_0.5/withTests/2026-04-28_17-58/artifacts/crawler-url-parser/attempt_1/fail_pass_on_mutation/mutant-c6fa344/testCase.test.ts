import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse URL without baseUrl', () => {
  it('should correctly parse a bare hostname like "www.google.com" without prepending http:// twice', () => {
    const res = parse("www.google.com");
    expect(res).not.toBeNull();
    expect(res.url).toBe("http://www.google.com/");
  });
});