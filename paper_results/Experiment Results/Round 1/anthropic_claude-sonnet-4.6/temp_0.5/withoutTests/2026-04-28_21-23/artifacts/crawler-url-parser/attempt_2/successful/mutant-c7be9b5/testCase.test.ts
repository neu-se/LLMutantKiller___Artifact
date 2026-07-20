describe('crawler-url-parser module.parent behavior', () => {
  it('should execute the testing block when module.parent is falsy (original code uses !module.parent)', () => {
    // Spy on console.log before requiring the module
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    
    // Reset modules to force re-evaluation of module-level code
    jest.resetModules();
    
    // Require the module fresh - this triggers the module-level if block
    require('../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
    
    // In Jest's environment, module.parent is null when first loaded,
    // so !module.parent is true in the original code → console.log IS called.
    // In mutated code, if(false) → console.log is NEVER called.
    const calledWithTestingPurpose = consoleSpy.mock.calls.some(
      (call) => call[0] === 'for testing purpose'
    );
    
    consoleSpy.mockRestore();
    
    expect(calledWithTestingPurpose).toBe(true);
  });
});