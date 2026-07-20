import * as vm from 'vm';
import * as fs from 'fs';
import * as path from 'path';

describe('removeQueryParameters regex anchor', () => {
  it('should use anchored /^utm_\\w+/i regex in result_normalize_options', () => {
    const modulePath = path.resolve(
      __dirname,
      '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js'
    );
    const source = fs.readFileSync(modulePath, 'utf-8');
    
    // Append code to expose the internal options
    const wrappedSource = source + '\nmodule.exports.__options = result_normalize_options;';
    
    const moduleObj = { exports: {} as any };
    const context = vm.createContext({
      require,
      module: moduleObj,
      exports: moduleObj.exports,
      console,
      __dirname: path.dirname(modulePath),
      __filename: modulePath,
    });
    
    vm.runInContext(wrappedSource, context);
    
    const options = moduleObj.exports.__options;
    expect(options).toBeDefined();
    expect(options.removeQueryParameters).toBeDefined();
    
    const utmRegex = options.removeQueryParameters.find(
      (item: any) => item instanceof RegExp
    );
    expect(utmRegex).toBeDefined();
    // Original: /^utm_\w+/i has source '^utm_\\w+'
    // Mutated: /utm_\w+/i has source 'utm_\\w+'
    expect(utmRegex.source).toBe('^utm_\\w+');
  });
});