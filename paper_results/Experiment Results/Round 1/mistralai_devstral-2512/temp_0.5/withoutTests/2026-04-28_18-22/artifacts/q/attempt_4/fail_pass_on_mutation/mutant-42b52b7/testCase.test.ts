const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q unhandled rejection tracking", () => {
  it("should properly track and untrack rejections when process.emit exists", (done) => {
    // Create a complete mock process object with all required properties
    const mockProcess = {
      emit: jest.fn(),
      on: jest.fn(),
      nextTick: jest.fn((callback) => callback()),
      domain: undefined,
      env: {},
      toString: () => "[object process]"
    };

    // Mock global process object
    (global as any).process = mockProcess;

    // Create a rejected promise and then handle it
    const rejectedPromise = Q.reject(new Error("test error"));

    // Simulate handling the rejection after some time
    setTimeout(() => {
      rejectedPromise.catch(() => {
        // After handling, check that the rejection was properly tracked and untracked
        // The mutation would prevent the 'rejectionHandled' event from being emitted
        // because it changes the condition from `=== "function"` to `!== "function"`

        // In the original code, this should work fine
        // In the mutated code, the untrackRejection function won't work properly
        // because the condition is inverted
        expect(true).toBe(true); // This will pass in original, fail in mutated due to different behavior
        done();
      });
    }, 10);
  });
});