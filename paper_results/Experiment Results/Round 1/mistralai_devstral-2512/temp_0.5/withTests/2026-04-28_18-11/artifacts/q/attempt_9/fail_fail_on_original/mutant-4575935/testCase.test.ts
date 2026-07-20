// Test to detect the mutation in q.js where the window/self check is replaced with `false`
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library browser environment detection", () => {
  it("should expose Q as a global in browser-like environments", () => {
    // Save original globals
    const originalWindow = (global as any).window;
    const originalSelf = (global as any).self;

    // Clean up any existing Q global
    delete (global as any).Q;

    // Simulate a browser-like environment
    (global as any).window = {};
    (global as any).self = {};

    // Force re-evaluation by requiring fresh
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    const freshQ = require("../../../../../../../../../../../subject_repositories/q/q.js");

    // In the original code, Q should be exposed as a global when window/self exists
    // In the mutated code (where condition is always false), it should not
    const globalQ = (global as any).Q;

    // The key test: in original code globalQ should equal freshQ
    // In mutated code, globalQ will be undefined
    expect(globalQ).toBe(freshQ);

    // Clean up
    (global as any).window = originalWindow;
    (global as any).self = originalSelf;
  });
});