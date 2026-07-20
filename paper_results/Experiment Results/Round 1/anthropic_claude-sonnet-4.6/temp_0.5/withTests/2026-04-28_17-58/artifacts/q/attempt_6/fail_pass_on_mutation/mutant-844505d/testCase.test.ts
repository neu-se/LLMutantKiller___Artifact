import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import * as domain from "domain";

describe("Promise.prototype.done domain support", () => {
  it("should catch thrown errors from done() via domain when Q.onerror is not set", (done) => {
    // Ensure Q.onerror is not set so onUnhandledError will throw
    const savedOnerror = (Q as any).onerror;
    (Q as any).onerror = null;

    const d = domain.create();
    const expectedError = new Error("domain should catch this");
    let domainCaughtError = false;

    d.on("error", (err: Error) => {
      domainCaughtError = true;
      (Q as any).onerror = savedOnerror;
      expect(err).toBe(expectedError);
      done();
    });

    d.run(() => {
      Q.reject(expectedError).done();
    });

    setTimeout(() => {
      (Q as any).onerror = savedOnerror;
      if (!domainCaughtError) {
        done(new Error("Domain did not catch the error"));
      }
    }, 300);
  });
});