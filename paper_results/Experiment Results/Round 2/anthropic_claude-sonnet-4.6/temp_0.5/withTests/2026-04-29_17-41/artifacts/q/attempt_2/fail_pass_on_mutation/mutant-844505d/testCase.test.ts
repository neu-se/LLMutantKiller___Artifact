import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import * as domain from "domain";

describe("node domain support in done()", () => {
  it("should bind the unhandled error handler to the active domain so domain catches the error", (done) => {
    const d = domain.create();
    const error = new Error("should be caught by domain");

    // Track whether the domain caught the error
    let domainCaughtError = false;

    // If domain doesn't catch it, process will emit uncaughtException
    // We use a timeout to fail if domain never catches it
    const failTimeout = setTimeout(() => {
      if (!domainCaughtError) {
        done(new Error("Domain did not catch the error - process.domain.bind was not called"));
      }
    }, 300);

    d.on("error", (theError: Error) => {
      domainCaughtError = true;
      clearTimeout(failTimeout);
      // Re-add the domain to prevent it from being destroyed
      d.exit();
      expect(theError).toBe(error);
      done();
    });

    // Run inside the domain - the promise rejection should be caught by domain
    d.run(() => {
      // At the time .done() is called, process.domain is set to d
      // The original code binds onUnhandledError to d
      // So when the error is thrown in a future tick, domain d catches it
      Q.reject(error).done();
    });
  });
});