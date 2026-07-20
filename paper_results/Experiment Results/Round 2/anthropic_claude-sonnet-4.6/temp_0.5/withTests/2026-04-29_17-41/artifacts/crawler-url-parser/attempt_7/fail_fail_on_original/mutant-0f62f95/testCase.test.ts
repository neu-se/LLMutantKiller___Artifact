describe('module loading side effects', () => {
  it('should not log when loaded as dependency', () => {
    // Intercept before any require
    const logged: string[] = [];
    const spy = jest.spyOn(console, 'log').mockImplementation((...args) => {
      logged.push(args.join(' '));
    });

    // Force fresh load
    jest.resetModules();
    require('../../../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');

    spy.mockRestore();
    
    expect(logged.some(l => l.includes('for testing purpose'))).toBe(false);
  });
});