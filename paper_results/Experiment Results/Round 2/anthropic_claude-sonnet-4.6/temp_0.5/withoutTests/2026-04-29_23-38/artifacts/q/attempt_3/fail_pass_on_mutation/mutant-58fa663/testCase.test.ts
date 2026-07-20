import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("untrackRejection", () => {
  it("should not call process.emit in untrackRejection when process.emit is not a function", (done) => {
    const originalEmit = process.emit.bind(process);
    
    // Step 1: Create unhandled rejection, wait for unhandledRejection event
    const p = Q.reject(new Error("unhandled test error"));
    
    // Wait for unhandledRejection to fire (meaning reportedUnhandledRejections is populated)
    process.once("unhandledRejection", () => {
      // Step 2: Now remove process.emit as a function
      (process as any).emit = null;
      
      const errors: Error[] = [];
      const uncaughtHandler = (err: Error) => errors.push(err);
      process.on("uncaughtException", uncaughtHandler);
      
      // Step 3: Handle the rejection
      p.then(null, () => {});
      
      // Step 4: Wait and check
      setTimeout(() => {
        process.removeListener("uncaughtException", uncaughtHandler);
        (process as any).emit = originalEmit;
        
        expect(errors).toHaveLength(0);
        done();
      }, 500);
    });
  });
});