import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q error propagation in tasks", () => {
  it("should propagate errors thrown in nextTick tasks as uncaught exceptions", (done) => {
    const testError = new Error("test error from task");
    const originalListeners = process.listeners("uncaughtException");
    
    // Remove existing listeners temporarily
    process.removeAllListeners("uncaughtException");
    
    process.once("uncaughtException", (err) => {
      // Restore original listeners
      originalListeners.forEach(l => process.on("uncaughtException", l));
      expect(err).toBe(testError);
      done();
    });
    
    Q.nextTick(function () {
      throw testError;
    });
  });
});