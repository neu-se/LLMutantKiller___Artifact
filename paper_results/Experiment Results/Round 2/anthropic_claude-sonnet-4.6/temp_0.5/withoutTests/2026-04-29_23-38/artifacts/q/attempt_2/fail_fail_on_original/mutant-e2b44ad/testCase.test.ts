import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import * as domain from "domain";

describe("Q.done domain binding", () => {
  it("should route unhandled rejection errors through active process.domain", (done) => {
    const d = domain.create();
    let errorCaughtByDomain = false;

    d.on("error", (err: Error) => {
      errorCaughtByDomain = true;
      expect(err.message).toBe("domain-test-error");
      expect(errorCaughtByDomain).toBe(true);
      done();
    });

    // If domain does NOT catch it within timeout, the test fails
    const failTimeout = setTimeout(() => {
      done(new Error("Domain did not catch the rejection - onUnhandledError was not bound to domain"));
    }, 500);

    d.run(() => {
      const deferred = Q.defer();
      deferred.promise.done();
      deferred.reject(new Error("domain-test-error"));
    });
  });
});