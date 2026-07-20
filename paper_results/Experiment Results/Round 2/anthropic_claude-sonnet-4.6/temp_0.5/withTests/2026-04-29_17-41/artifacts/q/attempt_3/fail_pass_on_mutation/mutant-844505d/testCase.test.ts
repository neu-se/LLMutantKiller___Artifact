import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import * as domain from "domain";

describe("node domain support in done()", () => {
  it("should bind onUnhandledError to domain active at done() call time so errors thrown asynchronously are caught by that domain", (done) => {
    const d = domain.create();
    const error = new Error("should be caught by domain d");

    let domainCaughtError = false;

    // Listen for uncaught exceptions as a fallback detector
    const uncaughtHandler = (err: Error) => {
      if (err === error) {
        process.removeListener("uncaughtException", uncaughtHandler);
        clearTimeout(failTimeout);
        // Error was NOT caught by domain - this means bind didn't work (mutant)
        done(new Error("Error was not caught by domain - process.domain.bind was not called"));
      }
    };

    const failTimeout = setTimeout(() => {
      if (!domainCaughtError) {
        done(new Error("Neither domain nor uncaughtException caught the error"));
      }
    }, 500);

    d.on("error", (theError: Error) => {
      domainCaughtError = true;
      clearTimeout(failTimeout);
      process.removeListener("uncaughtException", uncaughtHandler);
      expect(theError).toBe(error);
      done();
    });

    process.on("uncaughtException", uncaughtHandler);

    // Schedule done() call while inside domain d, then immediately exit
    d.run(() => {
      Q.reject(error).done();
    });
    
    // Force exit from domain so the async callback fires outside domain context
    // Only process.domain.bind() would preserve the domain association
    d.exit();
  });
});