import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q module loading and ses branch behavior", () => {
  it("should export a working Q function when loaded via CommonJS", () => {
    // The mutation removes the ses.ok() check which would prevent
    // definition() from being called when ses is defined but ses.ok() is false.
    // In Node.js (CommonJS path), Q should be properly exported and functional.
    expect(typeof Q).toBe("function");
    expect(typeof Q.defer).toBe("function");
    expect(typeof Q.resolve).toBe("function");
    expect(typeof Q.reject).toBe("function");
    expect(typeof Q.all).toBe("function");
    expect(typeof Q.when).toBe("function");

    // Verify basic promise creation works
    const fulfilled = Q(42);
    expect(Q.isFulfilled(fulfilled)).toBe(true);
    expect(fulfilled.inspect()).toEqual({ state: "fulfilled", value: 42 });

    // Verify defer works
    const deferred = Q.defer();
    expect(Q.isPending(deferred.promise)).toBe(true);
    deferred.resolve(100);
    expect(Q.isFulfilled(deferred.promise)).toBe(true);
    expect(deferred.promise.inspect()).toEqual({ state: "fulfilled", value: 100 });

    // Verify rejection works
    const error = new Error("test error");
    const rejected = Q.reject(error);
    expect(Q.isRejected(rejected)).toBe(true);
    expect(rejected.inspect()).toEqual({ state: "rejected", reason: error });

    // Verify Q.all works
    const allPromise = Q.all([Q(1), Q(2), Q(3)]);
    expect(Q.isFulfilled(allPromise)).toBe(true);
    expect(allPromise.inspect().value).toEqual([1, 2, 3]);
  });
});