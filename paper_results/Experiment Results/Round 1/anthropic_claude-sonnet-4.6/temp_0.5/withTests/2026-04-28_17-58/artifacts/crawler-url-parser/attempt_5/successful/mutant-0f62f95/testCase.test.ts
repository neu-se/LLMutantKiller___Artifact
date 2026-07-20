describe('module side effects when required', () => {
  it('should not print debug output when module is required as a dependency', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    try {
      // Force re-execution of module top-level code by clearing cache
      const resolved = require.resolve("../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js");
      delete require.cache[resolved];

      // Require the module - when required, module.parent is truthy
      // Original (!module.parent): debug block does NOT run => console.log NOT called
      // Mutated (module.parent):   debug block DOES run    => console.log IS called
      require("../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js");

      expect(consoleSpy).not.toHaveBeenCalledWith('for testing purpose');
    } finally {
      consoleSpy.mockRestore();
    }
  });
});