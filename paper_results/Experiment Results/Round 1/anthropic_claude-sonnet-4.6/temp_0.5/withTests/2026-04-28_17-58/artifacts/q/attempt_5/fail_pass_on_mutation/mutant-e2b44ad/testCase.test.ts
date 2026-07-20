import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import * as domain from "domain";

describe("Promise.prototype.done domain binding", () => {
  it("should have process.domain set when the error propagates through done()", (done) => {
    const d = domain.create();
    const expectedError = new Error("test error");
    let domainActiveWhenErrorThrown = false;

    // Intercept the error before it reaches the domain
    Q.onerror = function(err: Error) {
      // In the original code, onUnhandledError is bound to the domain,
      // so process.domain should be active here
      domainActiveWhenErrorThrown = (process.domain === d);
      // Prevent the error from propagating further
    };

    d.run(() => {
      Q.reject(expectedError).done();
    });

    setTimeout(() => {
      Q.onerror = null;
      expect(domainActiveWhenErrorThrown).toBe(true);
      done();
    }, 100);
  });
});