import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import * as domain from "domain";

describe("Promise.prototype.done with process.domain", () => {
  it("should route done() rejection errors through active domain when domain is present", (done) => {
    const d = domain.create();
    let domainCaughtError = false;
    let uncaughtError = false;

    const uncaughtHandler = (err: Error) => {
      uncaughtError = true;
    };

    process.on("uncaughtException", uncaughtHandler);

    d.on("error", (err: Error) => {
      domainCaughtError = true;
      process.removeListener("uncaughtException", uncaughtHandler);
      expect(err.message).toBe("test rejection");
      done();
    });

    d.run(() => {
      Q.reject(new Error("test rejection")).done();
    });

    setTimeout(() => {
      process.removeListener("uncaughtException", uncaughtHandler);
      if (!domainCaughtError) {
        done(new Error("Domain did not catch the error"));
      }
    }, 500);
  });
});