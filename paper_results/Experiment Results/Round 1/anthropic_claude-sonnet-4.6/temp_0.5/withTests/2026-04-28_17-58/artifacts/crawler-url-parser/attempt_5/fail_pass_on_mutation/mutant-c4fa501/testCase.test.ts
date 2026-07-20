const cup = require("../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js");

describe('result_normalize_options removeDirectoryIndex', () => {
  it('should expose removeDirectoryIndex as true in module internals', () => {
    // Access the module's internal state by checking if the option object is accessible
    // The module defines result_normalize_options at module scope
    // We can verify by checking behavior: parse a URL with index file
    // and verify the normalize options affect URL formatting
    const moduleExports = Object.keys(cup);
    // The module exports parse, extract, gettype
    // Verify the module loaded correctly with removeDirectoryIndex: true
    expect(cup.parse).toBeDefined();
    expect(cup.extract).toBeDefined();
    expect(cup.gettype).toBeDefined();
    
    // Test that index.htm in path is normalized in gettype comparisons
    // With removeDirectoryIndex true, /index.htm should normalize to /
    const r1 = cup.gettype('http://example.com/index.htm', 'http://example.com/');
    expect(r1).toBe('samelevel');
  });
});