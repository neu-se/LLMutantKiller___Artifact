import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import * as domain from "domain";

describe("Promise.prototype.done domain support", () => {
  it("should route errors from done() through the active Node.js domain", (done) => {
    const d = domain.create();
    const expectedError = new Error("test error for domain");
    let caughtError: Error | null = null;

    d.on("error", (err: Error) => {
      caughtError = err;
      d.exit();
      try {
        expect(caughtError).toBe(expectedError);
        done();
      } catch (e) {
        done(e);
      }
    });

    const errorTimeout = setTimeout(() => {
      done(new Error("Domain did not catch the error within timeout"));
    }, 500);

    d.on("error", () => {
      clearTimeout(errorTimeout);
    });

    d.run(() => {
      Q.reject(expectedError).done();
    });
  });
});