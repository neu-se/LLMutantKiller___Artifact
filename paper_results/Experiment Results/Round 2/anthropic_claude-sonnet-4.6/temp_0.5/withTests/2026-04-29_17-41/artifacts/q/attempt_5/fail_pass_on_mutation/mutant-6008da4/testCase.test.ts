import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import domain from "domain";

describe("domain handling in nextTick", () => {
  it("should properly associate tasks with the active domain", (done) => {
    const d = domain.create();
    const errors: Error[] = [];

    d.on("error", (err: Error) => {
      errors.push(err);
    });

    d.run(() => {
      // Schedule a task that throws while inside a domain
      // With isNodeJS=true (both original in Node and mutated): domain.exit/enter called around task
      // The domain should catch the error
      Q.nextTick(() => {
        const deferred = Q.defer();
        deferred.resolve(1);
        deferred.promise.then(() => {
          expect(errors.length).toBe(0);
          done();
        });
      });
    });
  });
});