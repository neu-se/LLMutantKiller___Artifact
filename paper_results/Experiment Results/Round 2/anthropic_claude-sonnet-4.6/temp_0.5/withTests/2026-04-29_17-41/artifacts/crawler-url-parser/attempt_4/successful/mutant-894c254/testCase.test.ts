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

    // Wrap source to expose the internal result_normalize_options
    const wrappedSource = source + '\nmodule.exports.__options = result_normalize_options;';

    const moduleObj: { exports: Record<string, any> } = { exports: {} };
    const context = vm.createContext({
      require,
      module: moduleObj,
      exports: moduleObj.exports,
      console,
      __dirname: path.dirname(modulePath),
      __filename: modulePath,
      process,
    });

    vm.runInContext(wrappedSource, context);

    const options = moduleObj.exports.__options;
    expect(options).toBeDefined();
    expect(Array.isArray(options.removeQueryParameters)).toBe(true);

    // Use toString() check instead of instanceof to work across VM contexts
    const utmRegex = options.removeQueryParameters.find(
      (item: any) => Object.prototype.toString.call(item) === '[object RegExp]'
    );
    expect(utmRegex).toBeDefined();
    // Original /^utm_\w+/i: source is '^utm_\\w+' (anchored with ^)
    // Mutated /utm_\w+/i: source is 'utm_\\w+' (no ^ anchor)
    expect(utmRegex.source).toBe('^utm_\\w+');
  });
});