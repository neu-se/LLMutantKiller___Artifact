import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import domain from "domain";

describe("Q progress error propagation", () => {
  it("throws when progress callback throws and Q.onerror is not set", (done) => {
    const d = domain.create();
    const testError = new Error("test-progress-error");
    let errorCaught = false;

    delete (Q as any).onerror;

    d.on("error", (err: Error) => {
      if (err === testError) {
        errorCaught = true;
        d.exit();
        expect(errorCaught).toBe(true);
        done();
      }
    });

    d.run(() => {
      const deferred = Q.defer();

      deferred.promise.then(null, null, function () {
        throw testError;
      });

      deferred.notify("value");
    });

    setTimeout(() => {
      if (!errorCaught) {
        done(new Error("Expected error to be thrown but it was not"));
      }
    }, 500);
  });
});