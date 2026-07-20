import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import * as domainLib from "node:domain";

describe("Q.done domain binding", () => {
  it("onUnhandledError runs in domain context even after domain.run() exits", (done) => {
    const d = domainLib.create();
    let activeDomainWhenErrorFired: any = "not-set";

    (Q as any).onerror = (err: Error) => {
      // Capture what domain is active when the error handler fires
      activeDomainWhenErrorFired = process.domain;
    };

    // Run inside domain, then exit - nextTick fires AFTER domain.run() returns
    d.run(() => {
      Q.reject(new Error("test-error")).done();
      // domain.run() returns here; process.domain becomes null
      // With original: onUnhandledError was bound to d, so it still runs in d
      // With mutated: onUnhandledError not bound, runs with process.domain === null
    });

    // Verify domain is no longer active here
    setTimeout(() => {
      (Q as any).onerror = undefined;
      if (activeDomainWhenErrorFired === d) {
        done(); // original: bound to domain, fires within domain context
      } else {
        done(new Error(`Expected domain to be active when error fired, got: ${activeDomainWhenErrorFired}`));
      }
    }, 500);
  });
});