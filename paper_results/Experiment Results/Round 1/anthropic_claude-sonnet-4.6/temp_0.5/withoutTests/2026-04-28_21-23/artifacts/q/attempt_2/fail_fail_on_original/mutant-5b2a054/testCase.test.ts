import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q nextTick task error re-throwing", () => {
  it("should re-throw errors from rejected promises via done", (done) => {
    const error = new Error("expected error");
    const originalListeners = process.listeners("uncaughtException");
    
    process.removeAllListeners("uncaughtException");
    process.once("uncaughtException", (err) => {
      // Restore listeners
      originalListeners.forEach(l => process.on("uncaughtException", l));
      expect(err).toBe(error);
      done();
    });
    
    Q.reject(error).done();
  });
});