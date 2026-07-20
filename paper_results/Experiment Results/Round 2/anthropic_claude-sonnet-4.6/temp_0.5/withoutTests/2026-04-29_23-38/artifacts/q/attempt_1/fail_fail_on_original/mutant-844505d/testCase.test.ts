import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import { domain } from "domain";

describe("Q.done with process.domain", () => {
  it("should bind onUnhandledError to process.domain when domain is active", (done) => {
    const d = domain.create();
    
    let domainCaughtError = false;
    let errorMessage = "test rejection error";
    
    d.on("error", (err) => {
      if (err.message === errorMessage) {
        domainCaughtError = true;
        d.exit();
        // Test passes - domain caught the error (original behavior)
        done();
      }
    });
    
    d.run(() => {
      // Create a rejected promise and call done() without a rejection handler
      // With original code: onUnhandledError is bound to domain, so domain catches it
      // With mutated code: onUnhandledError is not bound, error propagates differently
      const rejectedPromise = Q.reject(new Error(errorMessage));
      
      // Call done() - this should trigger onUnhandledError which should be domain-bound
      rejectedPromise.done();
    });
    
    // If domain doesn't catch it within timeout, test fails
    setTimeout(() => {
      if (!domainCaughtError) {
        done(new Error("Domain did not catch the error - mutation may be present"));
      }
    }, 1000);
  });
});