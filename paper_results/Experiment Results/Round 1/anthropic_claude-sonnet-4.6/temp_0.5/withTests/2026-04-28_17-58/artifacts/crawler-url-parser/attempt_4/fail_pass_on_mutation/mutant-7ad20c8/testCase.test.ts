const cup = require("../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js");

describe('module loading side effects', () => {
  it('should not call console.log when the module is required as a dependency', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    consoleSpy.mockImplementation(() => {});
    consoleSpy.mockClear();

    // Force module re-evaluation by clearing cache
    const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js");
    delete require.cache[modulePath];

    require("../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js");

    // In original code: module.parent is set when required, so the block does NOT run
    // In mutated code: if (true) always runs, so console.log IS called
    expect(consoleSpy).not.toHaveBeenCalledWith('for testing purpose');

    consoleSpy.mockRestore();
  });
});