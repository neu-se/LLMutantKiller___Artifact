import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q promise basic functionality", () => {
  it("should resolve a deferred promise and chain correctly", async () => {
    const deferred = Q.defer();
    
    let resolvedValue: number | undefined;
    
    const promise = deferred.promise.then((value: number) => {
      resolvedValue = value;
      return value * 2;
    });
    
    deferred.resolve(42);
    
    const result = await promise;
    
    expect(result).toBe(84);
    expect(resolvedValue).toBe(42);
  });
});