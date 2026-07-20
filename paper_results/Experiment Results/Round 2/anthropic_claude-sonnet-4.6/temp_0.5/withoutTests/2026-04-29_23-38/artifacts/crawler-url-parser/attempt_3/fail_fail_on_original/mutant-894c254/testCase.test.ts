import * as vm from 'vm';
import * as fs from 'fs';
import * as path from 'path';

describe('result_normalize_options removeQueryParameters regex', () => {
  it('should use anchored regex /^utm_\\w+/i to only match utm_ at start', () => {
    const modulePath = require.resolve('../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
    let code = fs.readFileSync(modulePath, 'utf8');
    
    // Append code to export the internal options for testing
    code += '\nmodule.exports.__result_normalize_options = result_normalize_options;';
    
    const moduleObj: any = { exports: {}, parent: null };
    const context: any = {
      require: (id: string) => require(id),
      module: moduleObj,
      exports: moduleObj.exports,
      __filename: modulePath,
      __dirname: path.dirname(modulePath),
      console,
      process,
    };
    moduleObj.exports = context.exports;
    
    vm.createContext(context);
    const wrappedCode = `(function(require, module, exports, __filename, __dirname) {\n${code}\n})(require, module, exports, __filename, __dirname)`;
    vm.runInContext(wrappedCode, context);
    
    const options = context.module.exports.__result_normalize_options;
    expect(options).toBeDefined();
    expect(options.removeQueryParameters).toBeDefined();
    expect(options.removeQueryParameters[0]).toBeInstanceOf(RegExp);
    
    const regex = options.removeQueryParameters[0] as RegExp;
    // Original: /^utm_\w+/i - source is '^utm_\\w+'
    // Mutated: /utm_\w+/i - source is 'utm_\\w+'
    expect(regex.source).toBe('^utm_\\w+');
  });
});