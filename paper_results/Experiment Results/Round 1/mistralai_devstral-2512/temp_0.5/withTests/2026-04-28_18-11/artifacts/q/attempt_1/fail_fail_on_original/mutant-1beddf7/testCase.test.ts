// Test case to detect the mutation in q.js
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.promise resolver execution", () => {
  it("should execute the resolver function with resolve, reject, and notify callbacks", (done) => {
    let resolverCalled = false;
    let resolveCalled = false;
    let rejectCalled = false;
    let notifyCalled = false;

    const promise = Q.Promise((resolve, reject, notify) => {
      resolverCalled = true;
      resolveCalled = typeof resolve === "function";
      rejectCalled = typeof reject === "function";
      notifyCalled = typeof notify === "function";
    });

    // Give the promise a chance to execute
    setTimeout(() => {
      expect(resolverCalled).toBe(true);
      expect(resolveCalled).toBe(true);
      expect(rejectCalled).toBe(true);
      expect(notifyCalled).toBe(true);
      done();
    }, 10);
  });
});