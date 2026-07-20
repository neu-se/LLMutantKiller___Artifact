const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.done mutation test", () => {
  it("should handle process.domain binding with falsy process", () => {
    // Save original process
    const originalProcess = global.process;

    // Test case 1: process is falsy (null) but has domain
    (global as any).process = null;
    (global as any).process = {
      domain: {
        bind: jest.fn((fn) => fn),
        enter: jest.fn(),
        exit: jest.fn()
      },
      nextTick: setImmediate
    };

    const deferred1 = Q.defer();
    let errorInOriginal = false;

    try {
      deferred1.promise.done(() => {});
    } catch (e) {
      errorInOriginal = true;
    }

    // Test case 2: process is truthy with domain
    (global as any).process = {
      domain: {
        bind: jest.fn((fn) => fn),
        enter: jest.fn(),
        exit: jest.fn()
      },
      nextTick: setImmediate
    };

    const deferred2 = Q.defer();
    let errorInMutated = false;

    try {
      deferred2.promise.done(() => {});
    } catch (e) {
      errorInMutated = true;
    }

    // Restore original process
    global.process = originalProcess;

    // Original should handle falsy process correctly (no error)
    // Mutated would fail on falsy process
    expect(errorInOriginal).toBe(false);
    expect(errorInMutated).toBe(false);
  });
});