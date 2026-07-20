import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import * as domain from "domain";

describe("domain exit after task execution", () => {
  it("errors thrown in promise handlers propagate to the correct domain", (done) => {
    const d = domain.create();
    const caughtErrors: Error[] = [];
    
    d.on("error", (err: Error) => {
      caughtErrors.push(err);
      // After catching, resolve the test
      try {
        expect(caughtErrors).toHaveLength(1);
        expect(caughtErrors[0].message).toBe("domain error");
        done();
      } catch (e) {
        done(e);
      }
    });

    const errorTimeout = setTimeout(() => {
      done(new Error("domain error handler was never called"));
    }, 500);

    d.run(() => {
      Q(42).then(() => {
        throw new Error("domain error");
      }).done();
    });
  });
});