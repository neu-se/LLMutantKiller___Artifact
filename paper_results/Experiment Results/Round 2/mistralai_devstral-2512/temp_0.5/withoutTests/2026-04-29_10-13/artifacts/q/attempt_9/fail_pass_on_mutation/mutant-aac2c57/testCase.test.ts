const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.done mutation test", () => {
  it("should correctly handle process.domain binding with falsy process", () => {
    // Save original process
    const originalProcess = global.process;

    // Create a scenario where process is falsy but has domain property
    // This specifically tests the difference between && and || in the condition
    (global as any).process = null;
    (global as any).process = {
      domain: {
        bind: jest.fn((fn) => {
          // This should only be called in the original version
          // In the mutated version, this would throw an error
          return fn;
        }),
        enter: jest.fn(),
        exit: jest.fn()
      },
      nextTick: setImmediate
    };

    const deferred = Q.defer();
    let domainBindCalled = false;

    // Override the bind function to track if it's called
    const originalBind = (global as any).process.domain.bind;
    (global as any).process.domain.bind = jest.fn((fn) => {
      domainBindCalled = true;
      return originalBind(fn);
    });

    // This should work in original (&&) but fail in mutated (||)
    deferred.promise.done(() => {});

    // Restore original process
    global.process = originalProcess;

    // In original code, domain.bind should be called
    // In mutated code, this would throw before reaching this point
    expect(domainBindCalled).toBe(true);
  });
});