import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function with protocol-less URL', () => {
  it('should handle URLs starting with a colon followed by slashes', () => {
    const result = parse("://example.com");
    expect(result).not.toBeNull();
    expect(result?.url).toBe("http:////example.com");
  });
});