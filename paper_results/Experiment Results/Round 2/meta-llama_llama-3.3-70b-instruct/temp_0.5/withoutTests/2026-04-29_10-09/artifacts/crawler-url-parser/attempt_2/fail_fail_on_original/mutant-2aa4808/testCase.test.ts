import { parse } from "../../crawler-url-parser.js";

describe('parse function', () => {
  it('should correctly parse a URL with a fragment', () => {
    const url = 'http://example.com/path#fragment';
    const result = parse(url);
    expect(result).not.toBeNull();
    expect(result.url).toBe('http://example.com/path');
  });
});