import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse', () => {
  it('should resolve relative URL against baseUrl with fragment', () => {
    const result = parse('relative/path', 'http://example.com/dir/#section');
    expect(result).not.toBeNull();
    expect(result!.url).toBe('http://example.com/dir/relative/path');
  });
});