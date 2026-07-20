import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function with URL normalization', () => {
  it('should normalize protocol to lowercase when normalizeProtocol is true', () => {
    const url = 'HTTP://EXAMPLE.COM/PATH';
    const result = parse(url);
    expect(result).not.toBeNull();
    if (result) {
      expect(result.protocol).toBe('http:');
      expect(result.host).toBe('example.com');
    }
  });
});