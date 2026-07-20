// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-164cb91/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise rejection tracking", () => {
  it("should track unhandled rejections when process.emit is a function", (done) => {
    // Create a rejected promise
    const rejectedPromise = Q.reject(new Error("Test error"));

    // Set up a mock process object with emit as a function
    const mockProcess = {
      emit: jest.fn(),
      on: jest.fn()
    };

    // Store original process
    const originalProcess = global.process;

    // Set up mock environment
    global.process = mockProcess;

    // Give time for the unhandled rejection tracking to occur
    setTimeout(() => {
      // Verify that emit was called with 'unhandledRejection'
      expect(mockProcess.emit).toHaveBeenCalledWith('unhandledRejection', expect.any(Error), rejectedPromise);

      // Clean up
      global.process = originalProcess;
      done();
    }, 50);
  });
});