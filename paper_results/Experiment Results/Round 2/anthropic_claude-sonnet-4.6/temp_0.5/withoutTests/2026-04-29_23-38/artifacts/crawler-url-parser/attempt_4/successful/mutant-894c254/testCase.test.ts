import * as vm from 'vm';
import * as fs from 'fs';
import * as path from 'path';

describe('result_normalize_options removeQueryParameters regex', () => {
  it('removeQueryParameters[0] should be anchored regex /^utm_\\w+/i', () => {
    const modulePath = require.resolve('../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
    const code = fs.readFileSync(modulePath, 'utf8');
    const augmentedCode = code + '\nmodule.exports.__test_options = result_normalize_options;';

    const moduleObj: any = { exports: {}, parent: {} };
    const context: any = {
      require: (id: string) => require(id),
      module: moduleObj,
      exports: moduleObj.exports,
      __filename: modulePath,
      __dirname: path.dirname(modulePath),
      console,
      process,
    };

    vm.createContext(context);
    vm.runInContext(
      `(function(require, module, exports, __filename, __dirname) {\n${augmentedCode}\n})(require, module, exports, __filename, __dirname)`,
      context
    );

    const options = context.module.exports.__test_options;
    expect(options).toBeDefined();
    expect(options.removeQueryParameters).toBeDefined();

    const regex = options.removeQueryParameters[0];
    expect(regex).toBeDefined();
    expect(typeof regex).toBe('object');

    // Original: /^utm_\w+/i - source is '^utm_\\w+' (anchored with ^)
    // Mutated: /utm_\w+/i - source is 'utm_\\w+' (not anchored)
    expect(regex.source).toBe('^utm_\\w+');
  });
});