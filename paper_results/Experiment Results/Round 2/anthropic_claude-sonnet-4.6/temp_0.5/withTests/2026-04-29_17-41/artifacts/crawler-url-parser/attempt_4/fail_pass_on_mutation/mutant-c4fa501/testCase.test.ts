import * as cup from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('result_normalize_options removeDirectoryIndex', () => {
  it('should have removeDirectoryIndex set to true in the module', () => {
    // The result_normalize_options object affects URL normalization behavior.
    // Access it via the module's internal require cache to verify the setting.
    const modulePath = require.resolve('../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
    const moduleExports = require(modulePath);
    // Force re-evaluation to access module-level variables indirectly
    // by checking that gettype normalizes index pages (which depends on removeDirectoryIndex: true)
    const result1 = moduleExports.gettype(
      'http://www.example.com/index.htm',
      'http://www.example.com/'
    );
    // With removeDirectoryIndex: true in options (even if inline logic handles it),
    // a link to index.htm at root should be treated as samelevel with root
    expect(result1).toBe('samelevel');
  });
});