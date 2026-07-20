import { Q } from "./q.js";

describe("Q unhandled rejection tracking", () => {
  it("should properly track and untrack unhandled rejections in Node.js environment", async () => {
    // Create a rejected promise that will be handled later
    const deferred = Q.defer();
    const promise = deferred.promise;

    // Simulate a Node.js environment with process.emit
    const originalProcess = global.process;
    global.process = {
      emit: jest.fn(),
      env: {},
      nextTick: setImmediate
    } as any;

    try {
      // Reject the promise
      deferred.reject(new Error("Test error"));

      // The rejection should be tracked
      expect(Q.getUnhandledReasons().length).toBe(1);

      // Handle the rejection
      await promise.catch(() => {});

      // The rejection should be untracked
      expect(Q.getUnhandledReasons().length).toBe(0);
    } finally {
      // Restore original process
      global.process = originalProcess;
    }
  });
});