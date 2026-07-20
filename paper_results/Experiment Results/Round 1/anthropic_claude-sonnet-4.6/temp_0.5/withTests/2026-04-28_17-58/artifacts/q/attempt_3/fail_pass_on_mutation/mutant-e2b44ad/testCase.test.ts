import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import * as domain from "domain";

describe("Promise.prototype.done domain binding", () => {
  it("should catch done() rejection errors via domain when domain is active during done() call", (done) => {
    const d = domain.create();
    const expectedError = new Error("should be caught by domain");
    let domainCaught = false;

    d.on("error", (err: Error) => {
      domainCaught = true;
      expect(err).toBe(expectedError);
      // Exit domain to prevent further interference
      d.exit();
      clearTimeout(failTimer);
      done();
    });

    // If domain doesn't catch it within time, the test fails
    const failTimer = setTimeout(() => {
      if (!domainCaught) {
        done(new Error("Domain did not catch the rejection error - domain binding missing"));
      }
    }, 200);

    // Run inside domain, then exit before the async tick fires.
    // The original code binds onUnhandledError to the domain,
    // so even after domain.exit(), the error still routes to the domain.
    // The mutated code does NOT bind, so the error is lost after domain.exit().
    d.run(() => {
      Q.reject(expectedError).done();
      // Immediately exit the domain so that by the time nextTick fires,
      // we are no longer in the domain - binding is the only way it gets caught
      d.exit();
    });
  });
});