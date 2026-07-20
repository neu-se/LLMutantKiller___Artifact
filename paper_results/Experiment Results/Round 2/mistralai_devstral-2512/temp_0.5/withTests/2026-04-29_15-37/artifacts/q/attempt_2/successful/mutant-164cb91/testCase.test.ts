// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-164cb91/testCase.test.ts
import * as qModule from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("should track unhandled rejections when process.emit is available", (done) => {
    // Store original process
    const originalProcess = global.process;

    // Mock process with emit function
    global.process = {
      ...originalProcess,
      emit: jest.fn()
    };

    // Get Q from the module
    const Q = qModule;

    // Create a rejected promise that won't be handled
    const rejectedPromise = Q.reject(new Error("test error"));

    // Wait for the next tick to allow the unhandled rejection tracking to occur
    setTimeout(() => {
      // Verify that process.emit was called with the correct arguments
      expect(global.process.emit).toHaveBeenCalledWith("unhandledRejection", expect.any(Error), rejectedPromise);

      // Restore original process
      global.process = originalProcess;
      done();
    }, 10);
  });
});