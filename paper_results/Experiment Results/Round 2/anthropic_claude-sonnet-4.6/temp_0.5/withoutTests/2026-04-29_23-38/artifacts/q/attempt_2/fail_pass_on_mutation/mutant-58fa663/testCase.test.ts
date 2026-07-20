import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("untrackRejection mutation detection", () => {
  it("skips process.emit call when process.emit is not a function", (done) => {
    const originalEmit = process.emit;
    const emitErrors: Error[] = [];
    
    (process as any).emit = null;
    
    // Listen for uncaught exceptions that would come from the mutated code
    const uncaughtHandler = (err: Error) => {
      emitErrors.push(err);
    };
    process.on("uncaughtException", uncaughtHandler);
    
    Q.reject(new Error("test rejection"))
      .then(null, () => "handled")
      .then(() => {
        setTimeout(() => {
          process.emit = originalEmit;
          process.removeListener("uncaughtException", uncaughtHandler);
          expect(emitErrors).toHaveLength(0);
          done();
        }, 100);
      });
  });
});