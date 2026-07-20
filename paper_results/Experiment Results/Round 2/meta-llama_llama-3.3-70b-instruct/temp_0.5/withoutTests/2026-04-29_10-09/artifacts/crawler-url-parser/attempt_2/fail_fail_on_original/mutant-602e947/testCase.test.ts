import { parse } from "../crawler-url-parser.js";

describe('crawler-url-parser', () => {
  it('should correctly handle url parsing with localhost', () => {
    const url = "://localhost:8080";
    const result = parse(url);
    expect(result).not.toBeNull();
    expect(result.protocol).toBe('http:');
    expect(result.host).toBe('localhost:8080');
  });
});