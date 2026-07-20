import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import * as domain from "domain";

describe("Promise.prototype.done domain support", () => {
  it("should bind the unhandled error handler to the active domain when done() is called", (done) => {
    const d = domain.create();
    const expectedError = new Error("domain-caught error");

    let domainCaughtError: Error | null = null;

    d.on("error", (err: Error) => {
      domainCaughtError = err;
      expect(err).toBe(expectedError);
      done();
    });

    const timeoutHandle = setTimeout(() => {
      done(new Error("Domain did not catch the error within the expected time"));
    }, 500);

    d.run(() => {
      Q.reject(expectedError).done();
    });

    // Clean up timeout if done is called
    const originalDone = done;
  });
});