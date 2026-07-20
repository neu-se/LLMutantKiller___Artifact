// <Jest test file containing exactly one test case>
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q module loading and basic functionality", () => {
  it("should export a working Q function that can create and resolve promises", async () => {
    expect(typeof Q).toBe("function");
    
    const deferred = Q.defer();
    deferred.resolve(42);
    
    const value = await new Promise<number>((resolve, reject) => {
      deferred.promise.then(
        (v: number) => resolve(v),
        (e: Error) => reject(e)
      );
    });
    
    expect(value).toBe(42);
    expect(Q.isFulfilled(deferred.promise)).toBe(true);
    expect(Q.isRejected(deferred.promise)).toBe(false);
  });
});