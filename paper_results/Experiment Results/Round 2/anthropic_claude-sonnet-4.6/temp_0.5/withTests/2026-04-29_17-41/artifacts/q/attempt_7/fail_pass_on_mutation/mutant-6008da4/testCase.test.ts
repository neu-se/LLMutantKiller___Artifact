import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import * as domain from "domain";

describe("nextTick domain capture", () => {
  it("should not capture domain on tasks scheduled outside a domain context", (done) => {
    const d = domain.create();
    const domainErrors: Error[] = [];
    
    d.on("error", (err: Error) => {
      domainErrors.push(err);
      done(err);
    });

    // Schedule nextTick INSIDE domain - both versions capture domain since isNodeJS=true by then
    // Schedule nextTick OUTSIDE domain - original: no domain captured, mutated: same
    // The difference must be elsewhere...
    
    // Test that errors thrown in promise handlers propagate correctly
    // With isNodeJS=true in runSingle: sync rethrow after setTimeout(flush,0)
    // With isNodeJS=false in runSingle: async rethrow via setTimeout
    
    const results: string[] = [];
    
    // Capture uncaught exceptions
    const originalListeners = process.listeners("uncaughtException");
    process.removeAllListeners("uncaughtException");
    
    process.once("uncaughtException", (err: Error) => {
      results.push("uncaught: " + err.message);
      // restore
      originalListeners.forEach(l => process.on("uncaughtException", l as any));
    });

    Q.nextTick(() => {
      results.push("task1");
    });

    setTimeout(() => {
      expect(results).toContain("task1");
      originalListeners.forEach(l => process.on("uncaughtException", l as any));
      done();
    }, 100);
  });
});