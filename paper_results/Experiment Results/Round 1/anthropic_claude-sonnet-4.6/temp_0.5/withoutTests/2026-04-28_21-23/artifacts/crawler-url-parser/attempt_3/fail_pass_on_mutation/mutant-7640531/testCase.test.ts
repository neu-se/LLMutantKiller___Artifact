import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse fragment handling', () => {
  it('should correctly parse URL with fragment', () => {
    const result = parse('http://example.com/path#section1');
    expect(result).not.toBeNull();
    expect(result!.url).toBe('http://example.com/path');
  });
});