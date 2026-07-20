import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q object_create fallback", () => {
  it("should work correctly even when Object.create is not available", () => {
    const originalCreate = Object.create;
    
    // Simulate environment without Object.create
    // @ts-ignore
    Object.create = undefined;
    
    jest.resetModules();
    
    // Re-require Q without Object.create
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const QFallback = require("../../../../../../../../../../../subject_repositories/q/q.js");
    
    // Restore Object.create
    Object.create = originalCreate;
    
    // Q should work with the fallback implementation
    const deferred = QFallback.defer();
    deferred.resolve(42);
    
    return deferred.promise.then((value: number) => {
      expect(value).toBe(42);
    });
  });
});