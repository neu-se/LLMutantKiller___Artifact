import { parse } from "../../../crawler-url-parser.js";

describe('crawler-url-parser', () => {
  it('should correctly handle URLs', () => {
    const url = "https://example.com";
    const result = parse(url);
    expect(result).not.toBeNull();
    expect(result.url).toBe("https://example.com");
    expect(result.protocol).toBe("https:");
    expect(result.host).toBe("example.com");
  });

  it('should correctly handle URLs with colon character in the original code', () => {
    const url = ":example.com";
    const result = parse(url);
    expect(result).toBeNull();
  });

  it('should not handle URLs with colon character in the mutated code', () => {
    const url = ":example.com";
    const result = parse(url);
    expect(result).not.toBeNull();
  });
});