import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse', () => {
  it('should handle protocol-relative URL with path', () => {
    const result = parse('//path.example.com/page');
    expect(result).not.toBeNull();
    expect(result!.protocol).toBe('http:');
  });
});