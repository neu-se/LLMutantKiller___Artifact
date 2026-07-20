import * as fs from 'fs';
import * as vm from 'vm';
import * as path from 'path';

describe("crawler-url-parser result_normalize_options", () => {
  it("should have removeTrailingSlash set to true", () => {
    const modulePath = require.resolve('../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
    const source = fs.readFileSync(modulePath, 'utf8');
    
    let capturedOptions: any = null;
    const mockModule = { exports: {}, parent: true };
    
    const context = vm.createContext({
      module: mockModule,
      exports: mockModule.exports,
      require: (name: string) => require(name),
      console,
      process,
      __filename: modulePath,
      __dirname: path.dirname(modulePath),
      __captureOptions: (opts: any) => { capturedOptions = opts; }
    });
    
    const script = source.replace('if (!module.parent)', 'if (false)') + '\n__captureOptions(result_normalize_options);';
    vm.runInContext(script, context);
    
    expect(capturedOptions).not.toBeNull();
    expect(capturedOptions.removeTrailingSlash).toBe(true);
  });
});