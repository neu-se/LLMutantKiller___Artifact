// Test to detect the mutation in q.js where the window/self check is replaced with `false`
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library global exposure", () => {
  it("should expose Q as a global in browser-like environments", () => {
    // Save original globals
    const originalWindow = (global as any).window;
    const originalSelf = (global as any).self;
    const originalQ = (global as any).Q;

    // Clean up any existing Q global
    delete (global as any).Q;

    // Simulate a browser-like environment
    (global as any).window = {};
    (global as any).self = {};

    // Force re-evaluation of the module by simulating what happens when the module is loaded
    // We'll use vm to run the module code in a context that has our mock globals
    const vm = require('vm');
    const fs = require('fs');
    const path = require('path');

    const qCode = fs.readFileSync(path.resolve("../../../../../../../../../../../subject_repositories/q/q.js"), 'utf8');

    // Create a context that simulates browser environment
    const context = {
      module: { exports: {} },
      exports: {},
      window: {},
      self: {},
      console: console,
      setTimeout: setTimeout,
      clearTimeout: clearTimeout,
      require: require,
      __dirname: __dirname,
      __filename: __filename
    };

    // Run the module code in our context
    vm.runInNewContext(qCode, context);

    // In the original code, Q should be exposed as a global in browser-like environments
    // In the mutated code (where the condition is always false), it should not
    expect(context.window.Q).toBeDefined();
    expect(context.window.Q).toBe(context.module.exports);

    // Clean up
    (global as any).window = originalWindow;
    (global as any).self = originalSelf;
    (global as any).Q = originalQ;
  });
});