import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse with removeDirectoryIndex option', () => {
  it('should normalize index.htm in URL path when removeDirectoryIndex is true', () => {
    // With removeDirectoryIndex: true, http://example.com/aaa/index.htm
    // should be normalized to http://example.com/aaa/
    // With removeDirectoryIndex: false, it stays as http://example.com/aaa/index.htm
    const result = parse('http://www.example.com/aaa/index.htm');
    expect(result!.url).toBe('http://www.example.com/aaa/');
  });
});