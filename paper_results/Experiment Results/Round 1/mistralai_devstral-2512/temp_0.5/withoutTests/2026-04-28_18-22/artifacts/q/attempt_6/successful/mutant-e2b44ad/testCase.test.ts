const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q.done() with process.domain", () => {
  it("should correctly detect process.domain when it exists", () => {
    // Create a mock process object with domain
    const originalProcess = global.process;
    global.process = {
      domain: {
        bind: (fn: Function) => fn,
        enter: () => {},
        exit: () => {}
      },
      nextTick: (fn: Function) => fn()
    } as any;

    // Create a flag to track if the domain binding was used
    let domainUsed = false;
    const originalBind = global.process.domain.bind;
    global.process.domain.bind = function(fn: Function) {
      domainUsed = true;
      return originalBind.call(this, fn);
    };

    // Create a rejected promise and call done() on it
    const rejectedPromise = Q.reject(new Error("Test error"));

    // Mock Q.onerror to prevent actual error throwing
    const originalOnerror = Q.onerror;
    Q.onerror = () => {
      // Verify that domain binding was used
      expect(domainUsed).toBe(true);
      Q.onerror = originalOnerror;
      global.process = originalProcess;
    };

    rejectedPromise.done();

    // Restore original process
    global.process = originalProcess;
  });
});