import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
  it('should normalize URL by removing directory index', () => {
    const url = 'http://example.com/path/index.html';
    const result = parse(url);
    expect(result.path).toBe('/path/');
  });
});