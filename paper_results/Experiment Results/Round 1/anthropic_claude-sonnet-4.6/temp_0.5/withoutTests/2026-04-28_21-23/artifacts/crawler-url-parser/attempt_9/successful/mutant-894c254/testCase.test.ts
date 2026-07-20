import * as fs from 'fs';
import * as path from 'path';
import * as vm from 'vm';

describe('removeQueryParameters regex anchor', () => {
  it('regex should be anchored to start of string', () => {
    const filePath = path.resolve(__dirname, '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
    const code = fs.readFileSync(filePath, 'utf8');
    
    const patchedCode = code.replace(
      'module.exports.parse = parse;',
      'module.exports._options = result_normalize_options; module.exports.parse = parse;'
    );
    
    const moduleObj: any = { exports: {} as any, parent: true };
    const context = vm.createContext({
      require: (mod: string) => require(mod),
      module: moduleObj,
      exports: moduleObj.exports,
      console,
      __dirname: path.dirname(filePath),
      __filename: filePath,
    });
    
    vm.runInContext(patchedCode, context);
    
    const options = moduleObj.exports._options;
    const removeQueryParams = options.removeQueryParameters;
    
    // Find the regex - check by testing it, not instanceof
    const regex = removeQueryParams.find((x: any) => typeof x !== 'string' && x.test);
    expect(regex).toBeDefined();
    // Original /^utm_\w+/i: source is '^utm_\\w+', won't match 'autm_source'
    // Mutant /utm_\w+/i: source is 'utm_\\w+', will match 'autm_source'
    expect(regex.test('autm_source')).toBe(false);
  });
});