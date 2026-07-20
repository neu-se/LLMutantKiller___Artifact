import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse', () => {
  it('should return correct result when resolving relative URL with base URL', () => {
    // Use a relative currentUrlStr so baseUrlStr parsing is exercised
    const result = parse('/absolute/path', 'http://example.com/base/');
    expect(result).not.toBeNull();
    expect(result?.url).toBe('http://example.com/absolute/path');
    expect(result?.host).toBe('example.com');
    expect(result?.domain).toBe('example.com');
    expect(result?.path).toBe('/absolute/path');
  });
});