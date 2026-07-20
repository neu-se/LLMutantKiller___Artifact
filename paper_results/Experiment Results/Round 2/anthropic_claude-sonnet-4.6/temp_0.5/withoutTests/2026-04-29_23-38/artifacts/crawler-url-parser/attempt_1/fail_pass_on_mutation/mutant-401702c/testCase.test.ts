import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse function', () => {
  it('should parse a plain hostname URL without base URL', () => {
    const result = parse('www.example.com');
    expect(result).not.toBeNull();
    expect(result?.url).toContain('http://');
  });
});