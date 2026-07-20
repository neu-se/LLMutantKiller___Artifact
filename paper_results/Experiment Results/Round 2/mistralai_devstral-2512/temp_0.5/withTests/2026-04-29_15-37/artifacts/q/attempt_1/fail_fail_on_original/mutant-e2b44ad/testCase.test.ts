// Test case to detect the mutation in q.js
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("process domain check mutation", () => {
  it("should correctly handle process.domain in Node.js environment", () => {
    // This test verifies that the mutation changes the behavior of the done() method
    // when process.domain exists. The mutation changes the type check from "object" to ""
    // which should cause the condition to fail and not bind the error handler to the domain.

    // Create a mock process object with domain
    const mockProcess = {
      domain: {
        bind: jest.fn((fn) => fn)
      }
    };

    // Replace global.process temporarily
    const originalProcess = global.process;
    global.process = mockProcess;

    try {
      const deferred = Q.defer();
      const promise = deferred.promise;

      // Set up a test to see if the domain.bind is called
      let domainBindCalled = false;
      mockProcess.domain.bind = jest.fn((fn) => {
        domainBindCalled = true;
        return fn;
      });

      // Trigger the done() method which should check process.domain
      promise.done();

      // Force the promise to reject to trigger the error path
      deferred.reject(new Error("test error"));

      // In the original code, domain.bind should be called
      // In the mutated code, it should not be called
      expect(domainBindCalled).toBe(true);

    } finally {
      // Restore original process
      global.process = originalProcess;
    }
  });
});