import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function protocol normalization', () => {
  it('should normalize HTTP protocol to lowercase', () => {
    const url = 'HTTP://EXAMPLE.COM';
    const result = parse(url);
    expect(result).not.toBeNull();
    if (result) {
      expect(result.protocol).toBe('http:');
      expect(result.host).toBe('EXAMPLE.COM');
    }
  });
});