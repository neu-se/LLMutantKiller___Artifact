import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("crawler-url-parser module loading behavior", () => {
  it("should not call console.log when imported as a module (not run directly)", () => {
    // In the original code: if (!module.parent) { console.log(...) }
    // module.parent is set when the module is imported, so !module.parent is false
    // Therefore console.log should NOT be called on import
    //
    // In the mutated code: if (true) { console.log(...) }
    // console.log WILL be called on import
    //
    // We need to check if console.log was called during module load.
    // Since the module is already loaded by the time this test runs,
    // we need to track it differently.
    //
    // We'll use a fresh require with a spy set up before loading.
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    
    // Clear the module from cache so it gets re-loaded
    const modulePath = require.resolve('../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
    delete require.cache[modulePath];
    
    // Re-require the module - this will trigger the if block if mutated
    require('../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
    
    const wasConsoleCalled = consoleSpy.mock.calls.some(
      call => call[0] === "for testing purpose"
    );
    
    consoleSpy.mockRestore();
    
    // In original: module.parent is set (truthy) when imported, so !module.parent is false
    // console.log should NOT have been called
    expect(wasConsoleCalled).toBe(false);
  });
});