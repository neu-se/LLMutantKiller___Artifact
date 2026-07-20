import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q promise basic functionality", () => {
  it("should resolve a deferred promise and execute then callbacks", async () => {
    const deferred = Q.defer();
    
    const resultPromise = deferred.promise.then((value: number) => value * 2);
    
    deferred.resolve(21);
    
    const result = await new Promise<number>((resolve) => {
      resultPromise.then((val: number) => resolve(val));
    });
    
    expect(result).toBe(42);
  });
});