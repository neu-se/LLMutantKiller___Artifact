import * as vm from 'vm';
import * as fs from 'fs';
import * as path from 'path';

describe('Delta module export guard', () => {
  it('original code guards module assignment, mutation does not', () => {
    // Look for compiled JS in dist directory
    const distPath = path.resolve(__dirname, '../../../../../../../../../../../subject_repositories/delta/dist/Delta.js');
    
    if (!fs.existsSync(distPath)) {
      // Skip if no compiled output
      return;
    }
    
    const code = fs.readFileSync(distPath, 'utf8');
    
    // Create a context without 'module' defined
    const context = vm.createContext({
      String,
      Object,
      Array,
      Math,
      require: (id: string) => {
        if (id === 'fast-diff') return require('fast-diff');
        if (id === 'lodash.clonedeep') return require('lodash.clonedeep');
        if (id === 'lodash.isequal') return require('lodash.isequal');
        return {};
      },
      exports: {},
      // Intentionally NOT defining 'module'
    });
    
    // Original: typeof module === 'object' is false when module is undefined → no error
    // Mutated: if (true) → tries module.exports = Delta → ReferenceError
    expect(() => vm.runInContext(code, context)).not.toThrow();
  });
});