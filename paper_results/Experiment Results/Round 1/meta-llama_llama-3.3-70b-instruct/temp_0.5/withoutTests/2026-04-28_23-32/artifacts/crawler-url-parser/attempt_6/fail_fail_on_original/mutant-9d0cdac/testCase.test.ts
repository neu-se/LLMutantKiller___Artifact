import { parse } from "./crawler-url-parser.js";

describe('parse function', () => {
  it('should correctly handle URLs without protocols', () => {
    const url = "www.example.com";
    const result = parse(url);
    expect(result).not.toBeNull();
    expect(result.url).toBe('http://www.example.com');
  });
});