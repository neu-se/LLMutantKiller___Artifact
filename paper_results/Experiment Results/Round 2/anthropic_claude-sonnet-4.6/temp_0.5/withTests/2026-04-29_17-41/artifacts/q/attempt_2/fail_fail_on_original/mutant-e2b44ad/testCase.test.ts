import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import * as domain from "domain";

describe("Promise.prototype.done domain support", () => {
  it("should bind onUnhandledError to the active domain so thrown errors are caught by the domain", (done) => {
    const d = domain.create();
    const expectedError = new Error("domain binding test error");

    const timeout = setTimeout(() => {
      // If domain never caught the error, the test fails
      done(new Error("Domain error handler was never called - domain binding did not occur"));
    }, 500);

    d.on("error", (err: Error) => {
      clearTimeout(timeout);
      expect(err).toBe(expectedError);
      done();
    });

    // Override Q.onerror to detect if error goes wrong path
    (Q as any).onerror = (err: Error) => {
      clearTimeout(timeout);
      done(new Error("Error went to Q.onerror instead of domain - domain binding failed"));
    };

    d.run(() => {
      // Use done() with a fulfilled promise but a callback that throws
      // This ensures onUnhandledError is called with the error
      Q.reject(expectedError).done();
    });
  });
});