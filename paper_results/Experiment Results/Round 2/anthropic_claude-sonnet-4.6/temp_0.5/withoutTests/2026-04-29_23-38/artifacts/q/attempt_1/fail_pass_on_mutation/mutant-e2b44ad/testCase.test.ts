import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import * as domain from "domain";

describe("Q.done with process.domain", () => {
  it("should bind onUnhandledError to process.domain when domain is active", (done) => {
    const d = domain.create();
    
    let domainCaughtError: Error | null = null;
    
    d.on("error", (err: Error) => {
      domainCaughtError = err;
      // Verify the error was caught by the domain
      expect(err.message).toBe("test rejection error");
      done();
    });
    
    d.run(() => {
      // In original code: process.domain exists, so onUnhandledError gets bound to domain
      // This means domain's error handler catches the error
      // In mutated code: condition is false, so onUnhandledError is NOT bound to domain
      // The error would be thrown as uncaught exception instead of caught by domain
      const deferred = Q.defer();
      deferred.promise.done();
      deferred.reject(new Error("test rejection error"));
    });
    
    // Set a timeout to fail if domain doesn't catch the error
    setTimeout(() => {
      if (!domainCaughtError) {
        done(new Error("Domain did not catch the error - mutation may be present"));
      }
    }, 1000);
  });
});