import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse', () => {
  it('should strip fragment and return valid URL for URL with hash', () => {
    const result = parse('http://example.com/#');
    expect(result).not.toBeNull();
    expect(result!.url).toBe('http://example.com/');
  });
});