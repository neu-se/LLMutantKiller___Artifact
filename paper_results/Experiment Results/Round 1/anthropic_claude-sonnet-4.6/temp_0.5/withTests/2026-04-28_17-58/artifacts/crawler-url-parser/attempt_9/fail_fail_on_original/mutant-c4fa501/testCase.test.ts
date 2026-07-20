const path = require("path");

describe('result_normalize_options value check via module cache', () => {
  it('removeDirectoryIndex should be true', () => {
    const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js");
    // Clear cache to ensure fresh load
    delete require.cache[modulePath];
    require(modulePath);
    
    // Access module's internal scope via the module wrapper
    // Node.js wraps modules, so we can try to get internal variables
    // by monkey-patching Object.defineProperty before require
    const originalDefineProperty = Object.defineProperty;
    let capturedOptions: any = undefined;
    
    delete require.cache[modulePath];
    
    // Intercept variable creation at module scope
    const Module = require('module');
    const originalCompile = Module.prototype._compile;
    Module.prototype._compile = function(content: string, filename: string) {
      if (filename === modulePath) {
        content = content.replace(
          'const result_normalize_options',
          'module.exports._result_normalize_options = module.exports._result_normalize_options || {}; const result_normalize_options = module.exports._result_normalize_options; Object.assign(result_normalize_options'
        );
      }
      return originalCompile.call(this, content, filename);
    };
    
    delete require.cache[modulePath];
    const cup = require(modulePath);
    Module.prototype._compile = originalCompile;
    
    expect(cup._result_normalize_options?.removeDirectoryIndex).toBe(true);
  });
});