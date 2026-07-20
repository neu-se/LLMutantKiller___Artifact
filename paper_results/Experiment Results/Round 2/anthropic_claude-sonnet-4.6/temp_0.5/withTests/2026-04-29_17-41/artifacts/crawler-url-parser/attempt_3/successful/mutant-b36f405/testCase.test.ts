import * as fs from 'fs';
import * as vm from 'vm';
import * as path from 'path';

describe('utm regex', () => {
  it('should use \\w+ not \\W+ in utm regex', () => {
    const modulePath = require.resolve('../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
    const source = fs.readFileSync(modulePath, 'utf-8');
    
    // Modify source to expose result_normalize_options
    const modifiedSource = source.replace(
      'const result_normalize_options',
      'module.exports._options = result_normalize_options'
    );
    
    const moduleObj = { exports: {} as any };
    const context = vm.createContext({
      require: require,
      module: moduleObj,
      exports: moduleObj.exports,
      __dirname: path.dirname(modulePath),
      __filename: modulePath,
      console: console,
      process: process,
    });
    
    vm.runInContext(modifiedSource, context);
    
    const options = moduleObj.exports._options;
    const utmRegex = options.removeQueryParameters[0];
    
    expect(utmRegex.test('utm_source')).toBe(true);
    expect(utmRegex.test('utm_campaign')).toBe(true);
  });
});