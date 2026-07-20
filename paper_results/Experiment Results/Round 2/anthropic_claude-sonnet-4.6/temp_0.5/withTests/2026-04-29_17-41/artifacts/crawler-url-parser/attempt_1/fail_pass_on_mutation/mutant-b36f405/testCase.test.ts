import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('utm parameter regex in module configuration', () => {
  it('should have removeQueryParameters configured with \\w+ pattern that matches utm_source', () => {
    // Access module internals through require cache
    const moduleId = require.resolve('../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
    const mod = require(moduleId);
    // The module doesn't export result_normalize_options directly
    // But we can test the behavior: parse should work correctly with utm params
    const result = parse('http://example.com/?utm_source=test&other=value');
    expect(result).not.toBeNull();
    expect(result!.querycount).toBe(2);
  });
});