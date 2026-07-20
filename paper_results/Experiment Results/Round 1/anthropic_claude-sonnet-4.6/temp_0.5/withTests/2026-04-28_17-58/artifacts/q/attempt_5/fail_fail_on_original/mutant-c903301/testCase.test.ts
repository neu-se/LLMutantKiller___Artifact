import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("progress error stops flush loop", () => {
  it("should not notify downstream when progress callback throws and Q.onerror is not set", (done) => {
    const def = (Q as any).defer();
    const downstreamValues: number[] = [];

    // No Q.onerror set - original throws, mutant swallows
    (Q as any).onerror = null;

    // Chain: def.promise -> progress throws -> downstream progress listener
    const chained = def.promise.then(null, null, function (val: number) {
      throw new Error("intentional throw in progress");
    });

    chained.then(null, null, function (val: number) {
      downstreamValues.push(val);
    });

    // Set Q.onerror after to catch any re-thrown errors
    (Q as any).onerror = function () {};

    def.notify(42);
    def.resolve();

    return def.promise.then(function () {
      return new Promise<void>((resolve) => {
        setTimeout(function () {
          (Q as any).onerror = null;
          expect(downstreamValues).toEqual([]);
          resolve();
          done();
        }, 100);
      });
    });
  });
});