import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import * as domain from "domain";

describe("Promise.prototype.done with process.domain", () => {
  it("should use process.domain.bind for onUnhandledError when domain is active", (done) => {
    const d = domain.create();
    
    let domainCaughtError = false;
    
    d.on("error", (err: Error) => {
      domainCaughtError = true;
      // Original code: domain catches the error (bound to domain)
      expect(err.message).toBe("test rejection");
      done();
    });
    
    d.run(() => {
      const rejectedPromise = Q.reject(new Error("test rejection"));
      rejectedPromise.done();
    });
    
    // If mutated, domain won't catch it - set a timeout to fail
    setTimeout(() => {
      if (!domainCaughtError) {
        done(new Error("Domain did not catch the error - mutation detected"));
      }
    }, 500);
  });
});