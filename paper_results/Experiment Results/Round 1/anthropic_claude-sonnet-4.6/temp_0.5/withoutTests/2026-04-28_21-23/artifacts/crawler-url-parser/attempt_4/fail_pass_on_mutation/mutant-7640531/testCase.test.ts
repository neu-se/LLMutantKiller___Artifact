import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse', () => {
  it('should strip fragment from URL with multiple hash characters', () => {
    const result = parse('http://example.com/path#section#subsection');
    expect(result).not.toBeNull();
    expect(result!.url).toBe('http://example.com/path');
  });
});