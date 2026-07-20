const cup = require("../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js");

describe('result_normalize_options', () => {
  it('removeDirectoryIndex should be true', () => {
    // result_normalize_options is defined at module scope
    // If it's accidentally attached to exports or global, we can detect it
    expect((cup as any).result_normalize_options).toEqual({ removeDirectoryIndex: true });
  });
});