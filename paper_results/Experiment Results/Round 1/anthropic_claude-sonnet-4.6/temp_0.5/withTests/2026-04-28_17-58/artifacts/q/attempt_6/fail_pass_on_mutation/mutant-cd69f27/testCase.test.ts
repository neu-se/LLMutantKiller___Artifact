describe("Q basic functionality", () => {
  it("should resolve a deferred promise with the correct value", () => {
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    
    const deferred = Q.defer();
    deferred.resolve(42);
    
    return deferred.promise.then((value: number) => {
      expect(value).toBe(42);
    });
  });
});