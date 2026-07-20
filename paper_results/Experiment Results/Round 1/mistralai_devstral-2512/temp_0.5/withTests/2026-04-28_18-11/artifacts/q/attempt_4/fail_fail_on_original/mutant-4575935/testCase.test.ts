// Test to detect the mutation in q.js where the window/self check is replaced with `false`
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library browser environment detection", () => {
  it("should expose Q as a global when running in a browser-like environment", () => {
    // Save original globals
    const originalWindow = (global as any).window;
    const originalSelf = (global as any).self;
    const originalQ = (global as any).Q;

    // Clean up any existing Q global
    delete (global as any).Q;

    // Simulate a browser-like environment
    (global as any).window = {};
    (global as any).self = {};

    // Load Q fresh by deleting from cache and requiring again
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    const freshQ = require("../../../../../../../../../../../subject_repositories/q/q.js");

    // In the original code, Q should be exposed as a global in browser-like environments
    // In the mutated code (where the condition is always false), it should not
    expect((global as any).Q).toBeDefined();
    expect((global as any).Q).toBe(freshQ);

    // Clean up
    (global as any).window = originalWindow;
    (global as any).self = originalSelf;
    (global as any).Q = originalQ;
  });
});