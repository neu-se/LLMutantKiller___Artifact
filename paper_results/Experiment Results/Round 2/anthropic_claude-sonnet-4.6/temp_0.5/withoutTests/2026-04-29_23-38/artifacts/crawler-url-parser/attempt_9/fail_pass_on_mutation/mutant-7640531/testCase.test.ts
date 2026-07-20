import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse', () => {
  it('should handle protocol-relative URL with fragment', () => {
    const result = parse('//example.com/path#section');
    expect(result).not.toBeNull();
    expect(result!.url).toBe('http://example.com/path');
  });
});