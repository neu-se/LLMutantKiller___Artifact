import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('crawler-url-parser', () => {
  it('should remove directory index when parsing URL with removeDirectoryIndex option', () => {
    const url = "https://www.example.com/path/to/index.html";
    const result_normalize_options = {
      removeDirectoryIndex: true,
      removeTrailingSlash: true,
      stripWWW: true,
      stripFragment: true,
      normalizeHttps: false,
      normalizeProtocol: true,
      removeQueryParameters: [/^utm_\w+/i, 'ref']
    };
    const originalRemoveDirectoryIndex = result_normalize_options.removeDirectoryIndex;
    result_normalize_options.removeDirectoryIndex = true;
    const parsedUrl = parse(url);
    if (parsedUrl!== null) {
      expect(parsedUrl.path).toBe('/path/to/');
    } else {
      expect(parsedUrl).not.toBeNull();
    }
    result_normalize_options.removeDirectoryIndex = originalRemoveDirectoryIndex;
  });
});