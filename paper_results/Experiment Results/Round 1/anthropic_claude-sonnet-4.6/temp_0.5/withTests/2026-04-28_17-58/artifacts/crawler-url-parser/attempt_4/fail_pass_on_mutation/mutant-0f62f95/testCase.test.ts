import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function basic behavior', () => {
  it('should correctly parse a valid HTTP URL', () => {
    const result = parse("http://www.google.com/aaa");
    expect(result).not.toBeNull();
    expect(result.url).toBe("http://www.google.com/aaa");
    expect(result.protocol).toBe("http:");
    expect(result.host).toBe("www.google.com");
    expect(result.domain).toBe("google.com");
    expect(result.path).toBe("/aaa");
  });
});