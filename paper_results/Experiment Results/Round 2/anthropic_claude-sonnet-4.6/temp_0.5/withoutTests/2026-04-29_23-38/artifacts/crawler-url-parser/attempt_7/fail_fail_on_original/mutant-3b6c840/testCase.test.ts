import * as fs from 'fs';
import * as path from 'path';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

describe("crawler-url-parser result_normalize_options", () => {
  it("should have removeTrailingSlash set to true in result_normalize_options", () => {
    const modulePath = require.resolve('../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
    const source = fs.readFileSync(modulePath, 'utf8');
    
    // Execute the module in a vm context where we can intercept the options
    const vm = require('vm');
    let capturedOptions: any = null;
    
    const mockModule = { exports: {} };
    const mockRequire = (name: string) => {
      if (name === 'url') return require('url');
      if (name === 'psl') return require('psl');
      if (name === 'cheerio') return require('cheerio');
      return require(name);
    };
    
    const context = vm.createContext({
      module: mockModule,
      exports: mockModule.exports,
      require: mockRequire,
      console,
      process,
      __filename: modulePath,
      __dirname: path.dirname(modulePath),
      captureOptions: (opts: any) => { capturedOptions = opts; }
    });
    
    // Modify source to capture the options
    const modifiedSource = source.replace(
      'const result_normalize_options = {',
      'captureOptions(result_normalize_options); const result_normalize_options = {'
    );
    
    // This won't work because captureOptions runs before the object is defined
    // Instead, patch after definition
    const modifiedSource2 = source.replace(
      /const result_normalize_options = \{[\s\S]*?\}/,
      (match) => `${match}; captureOptions(result_normalize_options);`
    );
    
    vm.runInContext(modifiedSource2, context);
    
    expect(capturedOptions).not.toBeNull();
    expect(capturedOptions.removeTrailingSlash).toBe(true);
  });
});