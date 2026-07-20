import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
  it('should strip trailing slash from the URL path', () => {
    const url = 'http://example.com/path/';
    const result = parse(url);
    expect(result.path).not.toContain('/path//');
  });
});