// Test case to detect the mutation in q.js
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("process domain check mutation", () => {
  it("should correctly handle process.domain in Node.js environment", () => {
    // Create a mock process object with domain
    const mockProcess = {
      domain: {
        bind: jest.fn((fn: Function) => fn),
        enter: jest.fn(),
        exit: jest.fn()
      },
      toString: () => "[object process]",
      nextTick: (fn: Function) => fn()
    };

    // Replace global.process temporarily
    const originalProcess = global.process;
    global.process = mockProcess as any;

    // Set up error handler to catch the expected error
    let errorCaught = false;
    Q.onerror = (error: Error) => {
      errorCaught = true;
    };

    try {
      const deferred = Q.defer();
      const promise = deferred.promise;

      // Set up a test to see if the domain.bind is called
      let domainBindCalled = false;
      mockProcess.domain.bind = jest.fn((fn: Function) => {
        domainBindCalled = true;
        return fn;
      });

      // Trigger the done() method which should check process.domain
      promise.done();

      // Force the promise to reject to trigger the error path
      deferred.reject(new Error("test error"));

      // Give some time for async operations
      return Q.delay(10).then(() => {
        // In the original code, domain.bind should be called
        // In the mutated code, it should not be called
        expect(domainBindCalled).toBe(true);
        expect(errorCaught).toBe(true);
      });
    } finally {
      // Restore original process
      global.process = originalProcess;
      Q.onerror = null;
    }
  });
});