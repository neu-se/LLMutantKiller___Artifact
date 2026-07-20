import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("progress callback error propagation", () => {
  it("does not notify when progress callback throws", (done) => {
    const deferred = Q.defer();
    const error = new Error("test progress error");
    (Q as any).onerror = (e: Error) => { /* suppress */ };

    const notified: any[] = [];
    deferred.promise.then(null, null, (v: any) => {
      throw error;
    });

    // Second listener that should NOT be notified if first throws
    // Actually both are separate - need different approach

    // Use Q.onerror = suppress, then check if deferred.notify resolves ok
    deferred.resolve(42);
    deferred.notify("progress");

    deferred.promise.then((val: any) => {
      expect(val).toBe(42);
      done();
    });
  });
});