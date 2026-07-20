import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('gettype with directory index normalization', () => {
  it('should treat /page/index.html as same level as /page/ when removeDirectoryIndex is true', () => {
    // With removeDirectoryIndex: true, index.html is stripped, so these should match as samelevel
    // With removeDirectoryIndex: false, they would not match the same way
    const result = gettype('http://www.example.com/page/index.html', 'http://www.example.com/page/about.html');
    expect(result).toBe('samelevel');
  });
});