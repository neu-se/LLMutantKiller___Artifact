import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function with protocol-less URL containing special characters', () => {
  it('should add http:// prefix to protocol-less URLs starting with non-word characters', () => {
    const result = parse("://example.com");
    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://://example.com/");
  });
});