import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import * as domain from "domain";

describe("Promise.prototype.done domain support", () => {
  it("should use process.domain.bind so errors thrown after domain exits still reach the domain", (done) => {
    const d = domain.create();
    const expectedError = new Error("domain binding test error");

    (Q as any).onerror = null;

    const timeout = setTimeout(() => {
      done(new Error("Domain error handler was never called"));
    }, 500);

    d.on("error", (err: Error) => {
      clearTimeout(timeout);
      expect(err).toBe(expectedError);
      done();
    });

    // Run reject outside the domain, but done() inside
    const rejectedPromise = Q.reject(expectedError);

    d.run(() => {
      // Call done() inside domain - this sets up onUnhandledError
      // In original: onUnhandledError gets bound to domain
      // In mutated: onUnhandledError is NOT bound to domain
      rejectedPromise.done();
      // Exit domain immediately after - domain is no longer active when nextTick fires
    });
  });
});