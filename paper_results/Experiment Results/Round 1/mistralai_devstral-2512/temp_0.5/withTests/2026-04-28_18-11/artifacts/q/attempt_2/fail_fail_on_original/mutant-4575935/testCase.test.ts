// Test to detect the mutation in q.js where the window/self check is replaced with `false`
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library browser environment detection", () => {
  it("should expose Q as a global when running in a browser-like environment", () => {
    // Save original globals
    const originalWindow = global.window;
    const originalSelf = global.self;
    const originalQ = global.Q;

    // Clean up any existing Q global
    delete global.Q;

    // Simulate a browser-like environment
    global.window = {};
    global.self = {};

    // Load Q fresh (this would normally be done by the module system)
    // The mutation changes the condition from checking window/self to always false
    // In the original code, this should expose Q as a global
    // In the mutated code, it should not

    // We need to evaluate the module code in the current context
    // Since we can't actually reload the module in Jest easily,
    // we'll check the behavior by examining what gets exposed
    const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");

    // In the original code, Q should be exposed as a global in browser-like environments
    // In the mutated code (where the condition is always false), it should not
    expect(global.Q).toBeDefined();
    expect(global.Q).toBe(qModule);

    // Clean up
    global.window = originalWindow;
    global.self = originalSelf;
    global.Q = originalQ;
  });
});