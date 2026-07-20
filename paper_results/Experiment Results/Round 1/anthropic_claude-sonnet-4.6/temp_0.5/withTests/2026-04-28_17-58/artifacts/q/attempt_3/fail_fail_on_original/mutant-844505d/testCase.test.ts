import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import * as domain from "domain";

describe("Promise.prototype.done domain support", () => {
  it("should bind onUnhandledError to the active domain, causing domain to catch the rejection", (done) => {
    const d = domain.create();
    const expectedError = new Error("test domain error");
    let caughtByDomain = false;
    let uncaughtByDomain = false;

    // Save original onerror
    const originalOnerror = (Q as any).onerror;

    // If domain binding is broken, the error goes to Q.onerror or throws
    (Q as any).onerror = (err: Error) => {
      uncaughtByDomain = true;
    };

    d.on("error", (err: Error) => {
      caughtByDomain = true;
      expect(err).toBe(expectedError);
      (Q as any).onerror = originalOnerror;
      done();
    });

    d.run(() => {
      Q.reject(expectedError).done();
    });

    setTimeout(() => {
      (Q as any).onerror = originalOnerror;
      if (!caughtByDomain) {
        done(new Error("Expected domain to catch the error, but it did not - domain binding is broken"));
      }
    }, 200);
  });
});