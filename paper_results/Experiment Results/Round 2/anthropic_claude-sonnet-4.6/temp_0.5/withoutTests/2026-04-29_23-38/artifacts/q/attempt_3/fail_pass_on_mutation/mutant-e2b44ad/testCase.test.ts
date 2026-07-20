import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import * as domain from "domain";

describe("Q.done domain binding", () => {
  it("binds onUnhandledError to process.domain so domain catches unhandled rejections", (done) => {
    const d = domain.create();
    let caughtByDomain = false;

    d.on("error", () => {
      caughtByDomain = true;
      expect(caughtByDomain).toBe(true);
      done();
    });

    d.run(() => {
      const deferred = Q.defer();
      deferred.promise.done();
      deferred.reject(new Error("test-domain-error"));
    });
  });
});