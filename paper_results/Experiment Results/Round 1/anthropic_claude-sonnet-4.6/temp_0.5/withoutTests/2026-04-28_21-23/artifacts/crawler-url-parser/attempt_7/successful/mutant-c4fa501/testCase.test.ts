describe('result_normalize_options has correct removeDirectoryIndex value', () => {
  it('removeDirectoryIndex should be true in the normalize options', () => {
    // Use vm module to evaluate the module and capture internal state
    const vm = require('vm');
    const fs = require('fs');
    const path = require('path');
    
    let capturedOptions: any = null;
    
    const moduleCode = fs.readFileSync(
      path.join(__dirname, '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js'),
      'utf8'
    );
    
    // Check the value by evaluating just the relevant portion
    const testCode = `
      const result = (function() {
        ${moduleCode.split('module.exports')[0]}
        return result_normalize_options;
      })();
      result;
    `;
    
    const result = vm.runInNewContext(testCode, {
      require: require,
      module: { parent: true },
      exports: {}
    });
    
    expect(result.removeDirectoryIndex).toBe(true);
  });
});