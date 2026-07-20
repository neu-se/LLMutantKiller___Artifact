import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q isNodeJS flag mutation", () => {
  it("should handle errors in promise chains without crashing the process", (done) => {
    const uncaughtErrors: Error[] = [];
    
    const handler = (err: Error) => {
      uncaughtErrors.push(err);
    };
    
    process.on("uncaughtException", handler);
    
    // When isNodeJS=true, a thrown error in a task gets re-thrown synchronously
    // through process.nextTick, causing an uncaughtException
    // When isNodeJS=false (original), errors go through setTimeout and don't crash
    
    Q.reject(new Error("test")).fail(() => {
      throw new Error("error in handler");
    });
    
    setTimeout(() => {
      process.removeListener("uncaughtException", handler);
      // Original: no uncaught exceptions (error handled via setTimeout)
      // Mutated: uncaught exception thrown via process.nextTick
      expect(uncaughtErrors.length).toBe(0);
      done();
    }, 100);
  });
});