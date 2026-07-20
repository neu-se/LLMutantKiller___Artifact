import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse with removeDirectoryIndex option', () => {
  it('should normalize index.html in URL path when removeDirectoryIndex is true', () => {
    const result = parse('http://www.example.com/section/index.html');
    // With removeDirectoryIndex: true, the URL should have index.html stripped
    // With removeDirectoryIndex: false, the URL should keep index.html
    expect(result).not.toBeNull();
    expect(result!.url).toBe('http://www.example.com/section/');
  });
});