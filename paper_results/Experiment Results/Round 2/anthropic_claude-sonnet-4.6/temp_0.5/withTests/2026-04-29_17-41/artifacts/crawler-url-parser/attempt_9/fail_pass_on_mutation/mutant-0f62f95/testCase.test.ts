describe('module parent check', () => {
  it('should have module.parent set when required by Jest test runner', () => {
    // In Jest environment, when this test file is run, 
    // the test file itself is required by Jest, so module.parent should be set
    // This verifies the Jest environment has module.parent truthy
    // Original: if (!module.parent) -> false -> block does NOT run
    // Mutated: if (module.parent) -> true -> block DOES run
    
    const logged: string[] = [];
    const spy = jest.spyOn(console, 'log').mockImplementation((...args) => {
      logged.push(args.join(' '));
    });

    // Don't reset modules - use the already-loaded module
    // The module was already loaded by Jest with module.parent set
    const modulePath = require.resolve('../../../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
    delete require.cache[modulePath];
    require('../../../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');

    spy.mockRestore();

    // Original (!module.parent): if module.parent is truthy, block does NOT run -> logged is empty
    // Mutated (module.parent): if module.parent is truthy, block DOES run -> logged has content
    expect(logged.some(l => l.includes('for testing purpose'))).toBe(false);
  });
});