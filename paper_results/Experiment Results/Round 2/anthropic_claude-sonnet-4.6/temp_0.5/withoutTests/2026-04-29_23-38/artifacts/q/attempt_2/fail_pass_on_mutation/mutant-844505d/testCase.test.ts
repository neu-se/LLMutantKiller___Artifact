import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import * as domainLib from "node:domain";

describe("Q.done domain binding", () => {
  it("binds onUnhandledError to process.domain so domain catches rejected promise errors", (done) => {
    const d = domainLib.create();
    let domainCaughtError = false;

    d.on("error", (err: Error) => {
      if (err.message === "domain-test-error") {
        domainCaughtError = true;
        d.exit();
        done();
      }
    });

    d.run(() => {
      // With original code: onUnhandledError is bound to domain via process.domain.bind()
      // so the domain's error handler catches it.
      // With mutated code: binding never happens, error is thrown outside domain context.
      Q.reject(new Error("domain-test-error")).done();
    });

    setTimeout(() => {
      if (!domainCaughtError) {
        done(new Error("Expected domain to catch the error but it did not - mutation detected"));
      }
    }, 500);
  });
});