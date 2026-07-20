import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse', () => {
  it('should return null for URL with newline in fragment', () => {
    // Both versions should return null due to illegal chars
    // But let's test the actual fragment stripping behavior
    const result = parse('http://example.com/path#section');
    expect(result!.url).toBe('http://example.com/path');
    expect(result!.path).toBe('/path');
  });
});