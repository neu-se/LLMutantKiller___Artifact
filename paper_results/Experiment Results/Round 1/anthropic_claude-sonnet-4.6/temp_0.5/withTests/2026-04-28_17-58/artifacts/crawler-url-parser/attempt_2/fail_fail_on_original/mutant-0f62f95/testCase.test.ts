describe('module direct-run block behavior', () => {
  it('should not call console.log when module is required by another module', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    // Clear the require cache to force re-execution of the module's top-level code
    const modulePath = require.resolve('../../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
    delete require.cache[modulePath];

    // Re-require the module
    // Original: if (!module.parent) => block does NOT run when required (module.parent is truthy when required)
    // Mutated:  if (module.parent)  => block DOES run when required (module.parent is truthy when required)
    require('../../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');

    expect(consoleSpy).not.toHaveBeenCalledWith('for testing purpose');

    consoleSpy.mockRestore();
  });
});