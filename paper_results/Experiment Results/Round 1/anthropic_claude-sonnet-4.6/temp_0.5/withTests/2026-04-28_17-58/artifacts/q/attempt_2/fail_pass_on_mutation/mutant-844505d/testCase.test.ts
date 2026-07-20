import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import * as domain from "domain";

describe("Promise.prototype.done domain support", () => {
  it("should route unhandled rejection errors through the active domain when done() is called", (done) => {
    const d = domain.create();
    const expectedError = new Error("test domain error");
    let caughtByDomain = false;

    d.on("error", (err: Error) => {
      caughtByDomain = true;
      expect(err).toBe(expectedError);
      // Verify the error was caught by the domain
      expect(caughtByDomain).toBe(true);
      done();
    });

    d.run(() => {
      Q.reject(expectedError).done();
    });

    // Give time for async processing, then check if domain caught it
    setTimeout(() => {
      if (!caughtByDomain) {
        done(new Error("Expected domain to catch the error, but it did not"));
      }
    }, 200);
  });
});