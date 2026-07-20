import * as vm from 'vm';
import * as fs from 'fs';
import * as path from 'path';
import { createRequire } from 'module';

describe('Delta module export conditional', () => {
  it('should safely handle environment without module variable', () => {
    const distPath = path.resolve(
      __dirname,
      '../../../../../../../../../../../subject_repositories/delta/dist/Delta.js'
    );
    
    const code = fs.readFileSync(distPath, 'utf8');
    
    // Create a require that resolves relative to the dist file
    const localRequire = createRequire(distPath);
    
    const context = vm.createContext({
      exports: {},
      require: localRequire,
      __dirname: path.dirname(distPath),
      __filename: distPath,
      String: String,
      Object: Object,
      Array: Array,
      Math: Math,
      Error: Error,
      TypeError: TypeError,
      RangeError: RangeError,
      console: console,
      process: process,
    });
    
    // Original: typeof module === 'object' → false → skip → no throw
    // Mutated: true → execute → module.exports = ... → ReferenceError!
    expect(() => vm.runInContext(code, context)).not.toThrow();
  });
});