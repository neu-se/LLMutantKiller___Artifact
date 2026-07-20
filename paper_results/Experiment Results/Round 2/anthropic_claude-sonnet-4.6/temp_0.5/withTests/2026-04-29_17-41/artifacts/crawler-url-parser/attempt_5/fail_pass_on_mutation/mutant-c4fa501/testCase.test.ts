describe('result_normalize_options value', () => {
  it('should have removeDirectoryIndex as true', () => {
    // Clear module cache to get fresh module
    const modulePath = require.resolve('../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
    delete require.cache[modulePath];
    
    // Monkey-patch Object.defineProperty or intercept the object creation
    // by overriding a method that would be called with the options
    const originalModule = require(modulePath);
    
    // Since result_normalize_options affects gettype's path normalization behavior
    // when index files are involved in URL comparison, test a specific edge case
    // where the page URL itself is an index file
    const result = originalModule.gettype(
      'http://www.example.com/',
      'http://www.example.com/index.html'
    );
    // With removeDirectoryIndex: true, /index.html normalizes to /
    // so these are samelevel. With false, they differ.
    expect(result).toBe('samelevel');
  });
});