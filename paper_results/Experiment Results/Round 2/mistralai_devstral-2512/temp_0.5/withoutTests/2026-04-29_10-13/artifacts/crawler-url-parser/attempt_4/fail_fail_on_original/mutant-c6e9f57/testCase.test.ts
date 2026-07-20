import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function with URL normalization', () => {
  it('should strip www from hostname when stripWWW is true', () => {
    const url = 'http://www.example.com/path';
    const result = parse(url);
    expect(result).not.toBeNull();
    if (result) {
      expect(result.host).toBe('example.com');
    }
  });
});