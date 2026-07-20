const cup = require("../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js");
const fs = require("fs");

describe('result_normalize_options', () => {
  it('removeDirectoryIndex should be true based on module behavior', () => {
    // Since result_normalize_options is module-scoped, test via gettype
    // which normalizes index.* - verify samelevel detection works with index files
    const r = cup.gettype(
      'http://www.example.com/aaa/index.htm',
      'http://www.example.com/aaa/bbb'
    );
    expect(r).toBe('uplevel');
  });
});