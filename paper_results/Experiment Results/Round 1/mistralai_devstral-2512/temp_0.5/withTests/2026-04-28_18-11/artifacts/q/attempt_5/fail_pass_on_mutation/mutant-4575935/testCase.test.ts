// Test to detect the mutation in q.js where the window/self check is replaced with `false`
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library browser environment detection", () => {
  it("should have noConflict method available in browser-like environments", () => {
    // Save original globals
    const originalWindow = (global as any).window;
    const originalSelf = (global as any).self;

    // Simulate a browser-like environment
    (global as any).window = {};
    (global as any).self = {};

    // Load Q fresh by deleting from cache and requiring again
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    const freshQ = require("../../../../../../../../../../../subject_repositories/q/q.js");

    // In the original code, Q should have noConflict method in browser-like environments
    // In the mutated code (where the condition is always false), it should not have this method
    expect(typeof freshQ.noConflict).toBe('function');

    // Clean up
    (global as any).window = originalWindow;
    (global as any).self = originalSelf;
  });
});