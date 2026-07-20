const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library nextTick implementation", () => {
  it("should use setImmediate when available in browser environment", () => {
    // Save original window and setImmediate
    const originalWindow = global.window;
    const originalSetImmediate = global.setImmediate;

    // Mock browser environment with setImmediate
    global.window = {} as any;
    let setImmediateUsed = false;

    // Create a proper setImmediate mock
    const mockSetImmediate = (callback: Function) => {
      setImmediateUsed = true;
      const result = setTimeout(callback, 0);
      return {
        __promisify__: () => Promise.resolve(),
        unref: () => {},
        ref: () => {},
        [Symbol.toPrimitive]: () => result
      };
    };

    global.setImmediate = mockSetImmediate as any;

    // Access the internal nextTick function to test directly
    const nextTick = Q.nextTick;

    // Create a task that will use nextTick
    let taskExecuted = false;
    nextTick(() => {
      taskExecuted = true;
    });

    // Restore originals
    global.window = originalWindow;
    global.setImmediate = originalSetImmediate;

    // The test passes if setImmediate was used in the original code
    // In the mutated version, setImmediate won't be used because the condition is always false
    expect(setImmediateUsed).toBe(true);
    expect(taskExecuted).toBe(true);
  });
});