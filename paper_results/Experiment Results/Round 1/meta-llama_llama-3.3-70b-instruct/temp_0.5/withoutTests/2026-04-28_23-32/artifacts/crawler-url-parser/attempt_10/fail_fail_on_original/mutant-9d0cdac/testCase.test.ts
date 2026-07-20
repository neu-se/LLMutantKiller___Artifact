import { parse } from "./crawler-url-parser.js";

describe('parse function', () => {
  it('should correctly handle URLs without protocols', () => {
    const url = "localhost:8080";
    const result = parse(url);
    expect(result).not.toBeNull();
    expect(result.url).toBe('http://localhost:8080');
  });
});