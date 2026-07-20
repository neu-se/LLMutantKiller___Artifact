import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
  it('should normalize https protocol', () => {
    const url = 'https://example.com/path';
    const result = parse(url);
    expect(result.protocol).toBe('https:');
  });
});