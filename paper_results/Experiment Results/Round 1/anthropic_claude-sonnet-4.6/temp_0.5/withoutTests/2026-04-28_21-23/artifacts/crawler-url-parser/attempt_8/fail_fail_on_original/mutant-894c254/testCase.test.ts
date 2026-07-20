import * as vm from 'vm';
import * as path from 'path';
import * as fs from 'fs';

describe('removeQueryParameters regex anchor', () => {
  it('regex should be anchored to start of string', () => {
    const filePath = path.resolve(__dirname, '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
    const code = fs.readFileSync(filePath, 'utf8');
    
    let capturedRegex: RegExp | null = null;
    
    // Inject code to capture result_normalize_options before the module runs
    const patchedCode = code.replace(
      'module.exports.parse = parse;',
      'module.exports.parse = parse; module.exports._testOptions = result_normalize_options;'
    );
    
    const moduleObj = { exports: {} as any, parent: true };
    vm.runInNewContext(patchedCode, {
      require: (mod: string) => require(mod),
      module: moduleObj,
      exports: moduleObj.exports,
      console,
      __dirname: path.dirname(filePath),
      __filename: filePath,
    });
    
    const options = moduleObj.exports._testOptions;
    const regexes = options.removeQueryParameters.filter((x: any) => x instanceof RegExp);
    expect(regexes.length).toBeGreaterThan(0);
    // Original: /^utm_\w+/i - source is '^utm_\\w+'
    // Mutant: /utm_\w+/i - source is 'utm_\\w+'
    expect(regexes[0].source).toBe('^utm_\\w+');
  });
});