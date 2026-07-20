import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import * as domain from "domain";

describe("Promise.prototype.done domain support", () => {
  it("should bind onUnhandledError to domain so errors are caught even when domain has exited", (done) => {
    const d = domain.create();
    const expectedError = new Error("domain binding test error");

    (Q as any).onerror = null;

    const timeout = setTimeout(() => {
      done(new Error("Domain error handler was never called - expected domain to catch error"));
    }, 500);

    d.on("error", (err: Error) => {
      clearTimeout(timeout);
      expect(err).toBe(expectedError);
      done();
    });

    const deferred = (Q as any).defer();

    d.run(() => {
      deferred.promise.done();
    });

    // Resolve the deferred OUTSIDE the domain, after domain has exited
    // In original: onUnhandledError is bound to domain, so domain catches the throw
    // In mutated: onUnhandledError is not bound, so domain may not catch it
    setTimeout(() => {
      deferred.reject(expectedError);
    }, 50);
  });
});