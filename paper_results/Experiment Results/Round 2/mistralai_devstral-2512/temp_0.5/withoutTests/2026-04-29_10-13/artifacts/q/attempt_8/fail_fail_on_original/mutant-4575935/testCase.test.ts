describe("Q library browser environment detection", () => {
  it("should expose Q as global when window or self is defined", () => {
    // Create a fresh context to test environment detection
    const vm = require('vm');
    const context = {
      console: console,
      require: require,
      module: { exports: {} },
      exports: {},
      global: {},
      window: {},  // Simulate browser window
      self: {}     // Simulate browser self
    };

    // Execute Q library code in this context
    vm.runInNewContext(`
      // This will trigger the browser path in original code
      // but will fail in mutated code (where condition is always false)
      const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
      if (typeof Q === 'undefined') {
        throw new Error('Q not loaded');
      }
      if (typeof global.Q === 'undefined') {
        throw new Error('Q not exposed as global');
      }
    `, context);

    // If we get here, the test passed
    expect(true).toBe(true);
  });
});