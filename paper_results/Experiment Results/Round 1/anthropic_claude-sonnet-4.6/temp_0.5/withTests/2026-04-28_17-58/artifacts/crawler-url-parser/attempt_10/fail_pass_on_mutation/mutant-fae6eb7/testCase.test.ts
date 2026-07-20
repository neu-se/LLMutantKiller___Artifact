import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse with protocol-relative baseUrl', () => {
  it('should handle protocol-relative baseUrl correctly', () => {
    const result = parse("page", "//www.example.com/aaa/bbb#section");
    expect(result).not.toBeNull();
    expect(result!.url).toBe("http://www.example.com/aaa/page");
    expect(result!.protocol).toBe("http:");
    expect(result!.baseurl).toBe("http://www.example.com/aaa/bbb");
  });
});