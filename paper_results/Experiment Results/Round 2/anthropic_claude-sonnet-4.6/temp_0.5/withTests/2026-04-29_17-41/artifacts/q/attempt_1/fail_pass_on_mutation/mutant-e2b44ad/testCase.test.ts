import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import * as domain from "domain";

describe("Promise.prototype.done domain support", () => {
  it("should route errors from done() through the active Node.js domain", (done) => {
    const d = domain.create();
    const expectedError = new Error("test error for domain");
    let domainCaughtError: Error | null = null;

    const timeout = setTimeout(() => {
      done(new Error("Domain error handler was never called"));
    }, 1000);

    d.on("error", (err: Error) => {
      domainCaughtError = err;
      clearTimeout(timeout);
      expect(domainCaughtError).toBe(expectedError);
      done();
    });

    d.run(() => {
      Q.reject(expectedError).done();
    });
  });
});