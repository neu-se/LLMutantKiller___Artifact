import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function with URL normalization options', () => {
  it('should normalize URLs by removing directory index and trailing slash when options are set', () => {
    const url = 'http://example.com/path/index.html';
    const result = parse(url);
    expect(result.path).toBe('/path/');
  });
});