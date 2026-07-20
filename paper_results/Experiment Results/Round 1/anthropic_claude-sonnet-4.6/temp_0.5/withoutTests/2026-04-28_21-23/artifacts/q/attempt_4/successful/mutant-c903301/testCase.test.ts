import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import domain from "domain";

describe("progress callback error propagation", () => {
  it("throws error from progress callback when Q.onerror is not set", (done) => {
    (Q as any).onerror = null;
    
    const d = domain.create();
    const error = new Error("test progress error");
    let timeoutHandle: ReturnType<typeof setTimeout>;
    let domainErrorCaught = false;

    d.on("error", (e: Error) => {
      domainErrorCaught = true;
      clearTimeout(timeoutHandle);
      d.exit();
      if (e === error) {
        done();
      } else {
        done(e);
      }
    });

    timeoutHandle = setTimeout(() => {
      d.exit();
      if (!domainErrorCaught) {
        done(new Error("Expected error to be thrown but it was swallowed (mutated code)"));
      }
    }, 500);

    d.run(() => {
      const deferred = Q.defer();
      deferred.promise.then(null, null, () => { throw error; });
      deferred.notify("value");
    });
  });
});