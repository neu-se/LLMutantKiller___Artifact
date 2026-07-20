import * as vm from 'vm';
import * as fs from 'fs';
import * as path from 'path';

describe('Delta module export conditional', () => {
  it('should safely handle environment without module variable', () => {
    // The original code uses: if (typeof module === 'object') 
    // which safely evaluates to false when module is not defined
    // The mutated code uses: if (true)
    // which would throw ReferenceError when module is not defined
    
    const distPath = path.resolve(
      __dirname,
      '../../../../../../../../../../../subject_repositories/delta/dist/Delta.js'
    );
    
    const code = fs.readFileSync(distPath, 'utf8');
    
    // Create a VM context without 'module' defined
    const mockExports = {};
    const context = vm.createContext({
      exports: mockExports,
      require: require,
      __dirname: path.dirname(distPath),
      __filename: distPath,
      String: String,
      Object: Object,
      Array: Array,
      Math: Math,
      Error: Error,
      console: console,
    });
    
    // Original: typeof module === 'object' → false → skip → no throw
    // Mutated: true → execute → module.exports = ... → ReferenceError!
    expect(() => vm.runInContext(code, context)).not.toThrow();
  });
});