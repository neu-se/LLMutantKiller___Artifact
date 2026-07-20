import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import * as domain from "domain";

describe("Promise.prototype.done domain support", () => {
  it("should bind onUnhandledError to current domain at the time done() is called", (done) => {
    const savedOnerror = (Q as any).onerror;
    (Q as any).onerror = null;

    const d = domain.create();
    const expectedError = new Error("domain should catch this");
    let domainCaughtError = false;

    d.on("error", (err: Error) => {
      domainCaughtError = true;
      (Q as any).onerror = savedOnerror;
      expect(err).toBe(expectedError);
      done();
    });

    // Create and call done() inside domain, but delay resolution to happen after exiting domain
    const deferred = Q.defer();

    d.run(() => {
      deferred.promise.done();
    });

    // Reject AFTER exiting the domain - with original code, onUnhandledError
    // was bound to domain when done() was called, so domain still catches it
    // With mutation, no binding occurs, so domain won't catch it
    setTimeout(() => {
      deferred.reject(expectedError);
    }, 50);

    setTimeout(() => {
      (Q as any).onerror = savedOnerror;
      if (!domainCaughtError) {
        done(new Error("Domain did not catch the error - domain binding is broken"));
      }
    }, 300);
  });
});