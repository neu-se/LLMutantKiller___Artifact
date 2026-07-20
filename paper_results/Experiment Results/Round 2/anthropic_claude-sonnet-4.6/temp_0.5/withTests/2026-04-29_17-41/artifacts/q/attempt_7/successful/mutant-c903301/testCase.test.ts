import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import domain from "domain";

describe("progress callback error handling without Q.onerror", () => {
  it("should throw error from progress callback when Q.onerror is not set", (done) => {
    const theError = new Error("progress-error-domain-test");
    const def = Q.defer();

    (Q as any).onerror = null;

    const d = domain.create();
    let caughtError: Error | null = null;

    d.on("error", function (err: Error) {
      caughtError = err;
      (Q as any).onerror = null;
      if (err === theError) {
        done();
      } else {
        done(new Error("Wrong error caught: " + err.message));
      }
    });

    const timeoutId = setTimeout(function () {
      (Q as any).onerror = null;
      if (!caughtError) {
        done(new Error("Error was silently swallowed - no error thrown"));
      }
    }, 300);

    d.run(function () {
      def.promise.progress(function () {
        throw theError;
      });

      def.notify(1);
      def.resolve();
    });
  });
});