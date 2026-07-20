import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse', () => {
  it('should return null for wp: protocol URL with base URL provided', () => {
    const result = parse('wp:/something', 'http://base.com/');
    expect(result).toBeNull();
  });
});