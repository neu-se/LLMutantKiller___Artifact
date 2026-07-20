import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import * as domain from "domain";

describe("node domain support in done()", () => {
  it("should bind onUnhandledError to domain so the nextTick throw is caught by the domain", (done) => {
    const d = domain.create();
    const error = new Error("domain binding test error");

    const failTimeout = setTimeout(() => {
      done(new Error("Domain error handler was not called"));
    }, 1000);

    d.on("error", (theError: Error) => {
      clearTimeout(failTimeout);
      expect(theError).toBe(error);
      done();
    });

    // We need process.domain to be `d` when done() is called (so bind happens),
    // but NOT when onUnhandledError actually executes (future tick).
    // d.run() exits the domain after the sync block, so the future tick runs outside d.
    // Only bind() preserves d as the domain for onUnhandledError's execution.
    d.run(() => {
      Q.reject(error).done();
    });
    // After d.run(), process.domain is null again.
    // The rejection handler (onUnhandledError) fires in a future nextTick.
    // Original: onUnhandledError is bound to d, so it runs inside d, 
    //           and the inner Q.nextTick captures d, so throw is caught by d.
    // Mutant: onUnhandledError is NOT bound, runs outside d,
    //         inner Q.nextTick captures null domain, throw is uncaught by d.
  });
});