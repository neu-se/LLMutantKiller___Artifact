import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse with protocol-relative URL resolution edge case', () => {
  it('should correctly parse host from URL resolved via base URL', () => {
    // Test where currentUrlStr after if-block might be //host/path
    // by using a base URL that when resolved produces a protocol-relative result
    const res = parse("path", "//www.example.com/base/");
    expect(res).not.toBeNull();
    expect(res!.host).toBe("www.example.com");
    expect(res!.url).toBe("http://www.example.com/base/path");
  });
});