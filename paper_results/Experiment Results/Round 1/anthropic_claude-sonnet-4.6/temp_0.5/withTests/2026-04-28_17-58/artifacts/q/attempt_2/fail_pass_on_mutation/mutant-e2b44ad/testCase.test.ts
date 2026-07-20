import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import * as domain from "domain";

describe("Promise.prototype.done domain binding", () => {
  it("should bind the error handler to the active domain so domain catches rejection errors", (done) => {
    const d = domain.create();
    const expectedError = new Error("domain-bound error");
    let domainCaughtError = false;

    const failTimeout = setTimeout(() => {
      if (!domainCaughtError) {
        done(new Error("Domain did not catch the error - domain binding is broken"));
      }
    }, 300);

    d.on("error", (err: Error) => {
      clearTimeout(failTimeout);
      domainCaughtError = true;
      expect(err).toBe(expectedError);
      done();
    });

    d.run(() => {
      // Reject a promise and call done() inside the domain.
      // The original code binds onUnhandledError to process.domain,
      // so when the error is thrown in the next tick, the domain catches it.
      // The mutated code skips the binding, so the domain won't catch it.
      Q.reject(expectedError).done();
    });
  });
});