import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import * as domain from "domain";

describe("node domain support in done()", () => {
  it("should have the domain active when onUnhandledError executes if done() was called inside a domain", (testDone) => {
    const d = domain.create();
    const error = new Error("test error");
    let domainWhenErrorFired: any = undefined;
    let errorHandlerCalled = false;

    // Use Q.onerror to intercept - this runs inside the onUnhandledError nextTick callback
    // If process.domain.bind was called, process.domain should be `d` here
    Q.onerror = function(err: any) {
      domainWhenErrorFired = process.domain;
      errorHandlerCalled = true;
    };

    d.run(() => {
      Q.reject(error).done();
    });

    setTimeout(() => {
      Q.onerror = null;
      expect(errorHandlerCalled).toBe(true);
      // With original code: process.domain.bind was called, so domain is active
      // With mutant: no bind, so process.domain is null when error fires
      expect(domainWhenErrorFired).toBe(d);
      testDone();
    }, 200);
  });
});