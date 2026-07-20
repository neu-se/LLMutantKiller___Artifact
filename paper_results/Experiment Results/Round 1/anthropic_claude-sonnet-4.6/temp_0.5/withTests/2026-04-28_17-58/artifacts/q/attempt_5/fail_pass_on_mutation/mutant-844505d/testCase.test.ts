import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import * as domain from "domain";

describe("Promise.prototype.done domain support", () => {
  it("should bind onUnhandledError to domain so errors are caught even when nextTick runs outside domain", (done) => {
    const d = domain.create();
    const expectedError = new Error("test domain error");
    let domainCaughtError = false;

    d.on("error", (err: Error) => {
      domainCaughtError = true;
      expect(err).toBe(expectedError);
      done();
    });

    // Run done() inside domain, but then immediately exit the domain
    // The nextTick callback runs outside the domain context
    // With original code: onUnhandledError is bound to domain, so domain catches it
    // With mutated code: onUnhandledError is not bound, domain does NOT catch it
    d.run(() => {
      const p = Q.reject(expectedError);
      // Exit domain before calling done()
      process.nextTick(() => {
        // Now we are outside the domain
        p.done();
      });
    });

    setTimeout(() => {
      if (!domainCaughtError) {
        done(new Error("Domain did not catch the error - domain binding may be broken"));
      }
    }, 300);
  });
});