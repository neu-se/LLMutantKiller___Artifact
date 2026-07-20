import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q promise basic functionality", () => {
  it("should resolve a deferred promise and chain correctly", async () => {
    const deferred = Q.defer();
    
    let resolvedValue: number | null = null;
    
    const promise = deferred.promise.then((value: number) => {
      resolvedValue = value * 2;
      return resolvedValue;
    });
    
    deferred.resolve(21);
    
    const result = await promise;
    
    expect(result).toBe(42);
    expect(resolvedValue).toBe(42);
  });
});