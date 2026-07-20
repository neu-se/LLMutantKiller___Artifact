import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q null rejection handling", () => {
  it("should complete promise chain when rejecting with null", (done) => {
    Q.longStackSupport = false;
    
    let completed = false;
    let errorInNextTick: Error | null = null;
    
    // Intercept uncaught exceptions
    const originalEmit = process.emit.bind(process);
    (process as any).emit = function(event: string, ...args: any[]) {
      if (event === 'uncaughtException') {
        errorInNextTick = args[0];
        return true; // prevent default handling
      }
      return originalEmit(event, ...args);
    };
    
    Q.reject(null).then(undefined, function(err: any) {
      completed = true;
    }).then(function() {
      (process as any).emit = originalEmit;
      expect(completed).toBe(true);
      expect(errorInNextTick).toBeNull();
      done();
    }, function(err: any) {
      (process as any).emit = originalEmit;
      done(err);
    });
    
    // Fallback timeout
    setTimeout(function() {
      (process as any).emit = originalEmit;
      if (!completed) {
        done(new Error("Handler never called, possible TypeError: " + errorInNextTick));
      }
    }, 1000);
  });
});