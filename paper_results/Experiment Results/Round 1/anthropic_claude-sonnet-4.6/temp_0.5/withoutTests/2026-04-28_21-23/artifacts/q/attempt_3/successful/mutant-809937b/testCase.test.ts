import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import domain from "domain";

describe("untrackRejection process.emit guard", () => {
  it("should not call process.emit when it is not a function", (done) => {
    const originalEmit = process.emit;
    
    // Use a domain to catch errors from async operations
    const d = domain.create();
    let domainError: Error | null = null;
    
    d.on('error', (err) => {
      domainError = err;
    });
    
    d.run(() => {
      // Step 1: Reject a promise and wait for it to be reported
      const deferred = Q.defer();
      deferred.reject(new Error("test rejection"));
      
      // Wait for unhandledRejection to fire (populates reportedUnhandledRejections)
      let unhandledFired = false;
      const trackingEmit = function(this: any, event: string, ...args: any[]) {
        if (event === "unhandledRejection") {
          unhandledFired = true;
        }
        return originalEmit.apply(process, [event, ...args] as any);
      };
      (process as any).emit = trackingEmit;
      
      setTimeout(() => {
        if (!unhandledFired) {
          process.emit = originalEmit;
          done(new Error("unhandledRejection was not fired"));
          return;
        }
        
        // Now replace process.emit with non-function
        (process as any).emit = null;
        
        // Handle the rejection
        deferred.promise.catch(() => {});
        
        // Wait for runAfter to execute
        setTimeout(() => {
          process.emit = originalEmit;
          d.exit();
          
          // Original: domainError is null (typeof check prevented crash)
          // Mutated: domainError is TypeError (tried to call null)
          try {
            expect(domainError).toBeNull();
            done();
          } catch (e) {
            done(e);
          }
        }, 200);
      }, 200);
    });
  });
});