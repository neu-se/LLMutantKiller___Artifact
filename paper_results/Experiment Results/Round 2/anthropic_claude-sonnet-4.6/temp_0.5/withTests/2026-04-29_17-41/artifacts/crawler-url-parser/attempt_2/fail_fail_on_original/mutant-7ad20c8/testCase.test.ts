describe('module loading side effects', () => {
  it('should not execute the testing block when required as a module', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    // Clear module cache to force re-evaluation of the module
    const modulePath = require.resolve('../crawler-url-parser.js');
    delete require.cache[modulePath];

    require('../crawler-url-parser.js');

    const calledWithTestingPurpose = consoleSpy.mock.calls.some(
      (call) => call[0] === 'for testing purpose'
    );

    consoleSpy.mockRestore();

    expect(calledWithTestingPurpose).toBe(false);
  });
});