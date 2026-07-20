import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q promise resolution", () => {
  it("should resolve a deferred promise and execute then callbacks", async () => {
    // This test verifies that the nextTick mechanism works correctly.
    // In the mutated code, when MessageChannel is available (Node.js environment),
    // requestTick is never set, causing promise resolution to fail.
    
    const result = await new Promise<number>((resolve, reject) => {
      const deferred = Q.defer();
      
      deferred.promise.then(
        (value: number) => {
          resolve(value);
        },
        (err: Error) => {
          reject(err);
        }
      );
      
      // Resolve the deferred - this triggers nextTick which requires requestTick
      deferred.resolve(42);
    });
    
    expect(result).toBe(42);
  });
});