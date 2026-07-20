import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import * as domain from "domain";

describe("node domain support in done()", () => {
  it("should transfer errors from rejected promises in done() into the active domain", (done) => {
    const d = domain.create();
    const error = new Error("domain test error");
    let caughtError: Error | null = null;

    const errorTimeout = setTimeout(() => {
      done(new Error("Domain error handler was never called - domain binding did not work"));
    }, 500);

    d.on("error", (theError: Error) => {
      caughtError = theError;
      clearTimeout(errorTimeout);
      expect(theError).toBe(error);
      done();
    });

    d.run(() => {
      Q.reject(error).done();
    });
  });
});