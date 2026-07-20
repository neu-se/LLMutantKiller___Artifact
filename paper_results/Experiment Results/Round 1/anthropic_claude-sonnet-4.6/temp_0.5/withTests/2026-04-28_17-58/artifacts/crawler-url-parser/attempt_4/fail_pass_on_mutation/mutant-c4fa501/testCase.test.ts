import * as cup from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('result_normalize_options configuration', () => {
  it('should have removeDirectoryIndex set to true for proper URL normalization', () => {
    // The gettype function normalizes index.* paths - test that index.htm 
    // and directory are treated as same level
    const result = cup.gettype(
      'http://www.example.com/section/',
      'http://www.example.com/section/index.htm'
    );
    expect(result).toBe('samelevel');
  });
});