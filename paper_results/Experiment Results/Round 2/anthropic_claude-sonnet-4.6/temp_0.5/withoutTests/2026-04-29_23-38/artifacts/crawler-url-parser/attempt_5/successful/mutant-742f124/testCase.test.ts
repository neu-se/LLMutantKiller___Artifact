import * as path from 'path';
import * as vm from 'vm';
import * as fs from 'fs';

describe("crawler-url-parser", () => {
  it("result_normalize_options should have stripFragment set to true", () => {
    const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js");
    const code = fs.readFileSync(modulePath, 'utf8');
    
    let capturedOptions: any = undefined;
    
    const mockModule = { exports: {} as any, parent: true };
    const mockRequire = (id: string) => {
      if (id === 'url') return require('url');
      if (id === 'psl') return require('psl');
      if (id === 'cheerio') return require('cheerio');
      return require(path.resolve(path.dirname(modulePath), id));
    };
    
    // Wrap code to capture result_normalize_options before it goes out of scope
    const wrappedCode = code.replace(
      'const result_normalize_options = {',
      'capturedOptions = result_normalize_options; const result_normalize_options = {'
    );
    
    // Use a different approach - append code to export the options
    const appendedCode = code + '\nmodule.exports.result_normalize_options = result_normalize_options;';
    
    const script = new vm.Script(appendedCode);
    const context = vm.createContext({
      require: mockRequire,
      module: mockModule,
      exports: mockModule.exports,
      console,
      __dirname: path.dirname(modulePath),
      __filename: modulePath,
    });
    
    script.runInContext(context);
    
    const options = mockModule.exports.result_normalize_options;
    expect(options).toBeDefined();
    expect(options.stripFragment).toBe(true);
  });
});