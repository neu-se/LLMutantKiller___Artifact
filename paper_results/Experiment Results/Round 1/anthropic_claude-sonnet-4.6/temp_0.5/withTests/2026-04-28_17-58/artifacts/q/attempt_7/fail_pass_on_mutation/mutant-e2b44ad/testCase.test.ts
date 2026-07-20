import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import * as domain from "domain";

describe("Promise.prototype.done domain binding", () => {
  it("should route done() rejection errors to domain error handler, not uncaughtException", (done) => {
    const d = domain.create();
    const expectedError = new Error("domain test error " + Date.now());
    let domainCaughtIt = false;
    let uncaughtCaughtIt = false;

    const uncaughtHandler = (err: Error) => {
      if (err === expectedError) {
        uncaughtCaughtIt = true;
      }
    };
    process.once("uncaughtException", uncaughtHandler);

    d.on("error", (err: Error) => {
      if (err === expectedError) {
        domainCaughtIt = true;
      }
    });

    d.run(() => {
      Q.reject(expectedError).done();
    });

    setTimeout(() => {
      process.removeListener("uncaughtException", uncaughtHandler);
      // Original: domain catches it (domainCaughtIt=true, uncaughtCaughtIt=false)
      // Mutated: domain does NOT catch it
      expect(domainCaughtIt).toBe(true);
      expect(uncaughtCaughtIt).toBe(false);
      done();
    }, 200);
  });
});