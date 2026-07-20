import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nextTick behavior", () => {
  it("should execute tasks asynchronously using nextTick", async () => {
    // This test verifies that Q promises resolve correctly,
    // which depends on requestTick being properly set up.
    // The mutation removes the setImmediate branch body, leaving requestTick undefined
    // in environments where setImmediate exists but process.nextTick doesn't.
    // We simulate this by testing that a basic promise chain resolves.
    
    const result = await new Promise<number>((resolve) => {
      const deferred = Q.defer();
      deferred.promise.then((value: number) => {
        resolve(value);
      });
      deferred.resolve(42);
    });
    
    expect(result).toBe(42);
    
    // Additionally verify nextTick.runAfter works
    const laterResult = await new Promise<string>((resolve) => {
      Q.nextTick.runAfter(() => {
        resolve("ran after");
      });
    });
    
    expect(laterResult).toBe("ran after");
  });
});