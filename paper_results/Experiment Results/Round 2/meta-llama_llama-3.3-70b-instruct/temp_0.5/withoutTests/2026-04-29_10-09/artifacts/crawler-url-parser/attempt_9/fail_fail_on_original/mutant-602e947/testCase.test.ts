import { parse } from "../crawler-url-parser";

describe('crawler-url-parser', () => {
  it('should correctly handle url parsing with localhost', () => {
    const url = "localhost";
    const result = parse(url);
    expect(result).not.toBeNull();
    expect(result.protocol).toBe('http:');
    expect(result.host).toBe('localhost');
  });
});