import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse with removeDirectoryIndex option', () => {
  it('should normalize index.html to directory path when removeDirectoryIndex is true', () => {
    const result = parse('http://www.example.com/index.html');
    // With removeDirectoryIndex: true, should normalize to http://www.example.com/
    // With removeDirectoryIndex: false, should keep http://www.example.com/index.html
    expect(result.url).toBe('http://www.example.com/');
  });
});