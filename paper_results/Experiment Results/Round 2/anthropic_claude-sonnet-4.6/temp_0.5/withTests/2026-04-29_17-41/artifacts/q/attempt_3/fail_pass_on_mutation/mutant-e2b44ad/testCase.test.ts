import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import * as domain from "domain";

describe("Promise.prototype.done domain support", () => {
  it("should bind onUnhandledError to the active domain so thrown errors reach the domain error handler", (done) => {
    const d = domain.create();
    const expectedError = new Error("domain binding test error");

    // Ensure Q.onerror is null so onUnhandledError will throw
    (Q as any).onerror = null;

    const timeout = setTimeout(() => {
      done(new Error("Domain error handler was never called"));
    }, 500);

    d.on("error", (err: Error) => {
      clearTimeout(timeout);
      expect(err).toBe(expectedError);
      done();
    });

    d.run(() => {
      Q.reject(expectedError).done();
    });
  });
});