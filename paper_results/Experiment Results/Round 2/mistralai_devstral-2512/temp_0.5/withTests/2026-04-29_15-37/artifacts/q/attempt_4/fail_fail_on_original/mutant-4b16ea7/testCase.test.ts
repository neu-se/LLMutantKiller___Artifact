const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library setImmediate usage", () => {
  it("should use setImmediate when available in browser environment", () => {
    // Save original window and setImmediate
    const originalWindow = global.window;
    const originalSetImmediate = global.setImmediate;

    // Mock browser environment with setImmediate
    global.window = {} as any;
    let setImmediateCalled = false;
    global.setImmediate = (callback: Function) => {
      setImmediateCalled = true;
      setTimeout(callback, 0);
      return { __promisify__: () => {} } as any;
    };

    // Create a promise that will use the event loop
    const deferred = Q.defer();
    let result = null;

    deferred.promise.then((value: any) => {
      result = value;
    });

    // Resolve the promise
    deferred.resolve("test");

    // Restore originals
    global.window = originalWindow;
    global.setImmediate = originalSetImmediate;

    // The test passes if setImmediate was called in the original code
    // In the mutated version, setImmediate won't be called because the condition is always false
    expect(setImmediateCalled).toBe(true);
    expect(result).toBe("test");
  });
});