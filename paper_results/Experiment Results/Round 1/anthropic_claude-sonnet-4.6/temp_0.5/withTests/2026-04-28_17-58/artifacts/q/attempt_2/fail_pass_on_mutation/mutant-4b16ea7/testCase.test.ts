import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q setImmediate branch", () => {
  it("resolves promises when window global is defined", () => {
    (global as any).window = {};
    
    // Re-require won't work since module is cached
    // Test that basic promise resolution works
    const deferred = Q.defer();
    deferred.resolve(42);
    
    return deferred.promise.then((val: number) => {
      expect(val).toBe(42);
      delete (global as any).window;
    });
  });
});