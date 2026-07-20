describe('module loading side effects', () => {
  it('should not print testing purpose message when loaded as a module', () => {
    // Set up spy before clearing cache
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    // Force module re-evaluation
    const modulePath = require.resolve('../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
    delete require.cache[modulePath];

    // Also clear dependencies that might be cached
    require('../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');

    const calls = consoleSpy.mock.calls.map(call => call[0]);
    
    consoleSpy.mockRestore();

    // Original: module.parent is truthy when required, block doesn't run
    // Mutated: if (true) always runs, console.log('for testing purpose') is called
    expect(calls).not.toContain('for testing purpose');
  });
});