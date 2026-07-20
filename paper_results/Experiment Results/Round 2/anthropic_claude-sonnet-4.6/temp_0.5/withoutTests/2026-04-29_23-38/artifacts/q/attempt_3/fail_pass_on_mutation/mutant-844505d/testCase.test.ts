import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import * as domainLib from "node:domain";

describe("Q.done domain binding", () => {
  it("onUnhandledError is bound to domain so it executes within domain context", (done) => {
    const d = domainLib.create();
    let errorHandledInDomain = false;

    // Override Q.onerror to observe whether process.domain is active when it fires
    const originalOnerror = (Q as any).onerror;
    (Q as any).onerror = (err: Error) => {
      // With original code: onUnhandledError was bound to domain,
      // so process.domain should be `d` when this runs.
      // With mutated code: no binding, process.domain may not be `d`.
      if (process.domain === d) {
        errorHandledInDomain = true;
      }
    };

    d.run(() => {
      Q.reject(new Error("domain-binding-test")).done();
    });

    setTimeout(() => {
      (Q as any).onerror = originalOnerror;
      if (errorHandledInDomain) {
        done();
      } else {
        done(new Error("Error was not handled within domain context - mutation may be present"));
      }
    }, 500);
  });
});