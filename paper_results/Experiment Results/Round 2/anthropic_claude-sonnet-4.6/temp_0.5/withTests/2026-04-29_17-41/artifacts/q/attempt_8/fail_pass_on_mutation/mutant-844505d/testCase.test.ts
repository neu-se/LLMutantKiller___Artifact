import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import * as domain from "domain";

describe("node domain support in done()", () => {
  it("should bind error handler to domain even when promise was rejected before entering domain", (testDone) => {
    const d = domain.create();
    const error = new Error("test error");
    let domainWhenErrorFired: any = "not-set";

    Q.onerror = function(err: any) {
      domainWhenErrorFired = process.domain;
    };

    // Create and reject promise BEFORE entering domain
    const rejected = Q.reject(error);

    // Now enter domain and call done() on already-rejected promise
    d.run(() => {
      rejected.done();
    });

    setTimeout(() => {
      Q.onerror = null;
      expect(domainWhenErrorFired).toBe(d);
      testDone();
    }, 200);
  });
});