const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library nextTick implementation", () => {
  it("should use setImmediate when available in browser environment", () => {
    // Save original window and setImmediate
    const originalWindow = global.window;
    const originalSetImmediate = global.setImmediate;

    // Mock browser environment with setImmediate
    global.window = {} as any;
    let setImmediateUsed = false;

    // Create a proper setImmediate mock that tracks calls
    const mockSetImmediate = (callback: Function) => {
      setImmediateUsed = true;
      // Call the callback immediately to simulate setImmediate behavior
      callback();
      return {
        __promisify__: () => Promise.resolve(),
        unref: () => {},
        ref: () => {},
        [Symbol.toPrimitive]: () => ({})
      };
    };

    global.setImmediate = mockSetImmediate as any;

    // Force Q to re-evaluate its nextTick implementation
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    const Q2 = require("../../../../../../../../../../../subject_repositories/q/q.js");

    // Create a promise and immediately check if setImmediate was used
    const deferred = Q2.defer();
    deferred.resolve("test");

    // Restore originals
    global.window = originalWindow;
    global.setImmediate = originalSetImmediate;

    // The test passes if setImmediate was used in the original code
    // In the mutated version, setImmediate won't be used because the condition is always false
    expect(setImmediateUsed).toBe(true);
  });
});