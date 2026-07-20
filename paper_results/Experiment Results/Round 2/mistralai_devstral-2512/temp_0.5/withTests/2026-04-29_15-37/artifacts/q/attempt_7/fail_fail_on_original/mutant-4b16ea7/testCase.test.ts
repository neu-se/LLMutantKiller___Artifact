const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library setImmediate usage", () => {
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

    // Force Q to re-evaluate its nextTick implementation
    // by creating a new context where setImmediate is available
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    const Q2 = require("../../../../../../../../../../../subject_repositories/q/q.js");

    // Create a promise that will trigger the event loop mechanism
    const deferred = Q2.defer();
    let promiseResult: any = null;

    deferred.promise.then((value: any) => {
      promiseResult = value;
    });

    // Resolve the promise
    deferred.resolve("test");

    // Restore originals
    global.window = originalWindow;
    global.setImmediate = originalSetImmediate;

    // The test passes if setImmediate was used in the original code
    // In the mutated version, setImmediate won't be used because the condition is always false
    expect(setImmediateUsed).toBe(true);
    expect(promiseResult).toBe("test");
  });
});