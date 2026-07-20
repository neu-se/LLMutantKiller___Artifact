import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("finally on fulfilled promise with callback returning promise", () => {
  it("should fulfill with original value after callback promise resolves", () => {
    const callbackDeferred = Q.defer();
    
    const result = Q("original")["finally"](function() {
      return callbackDeferred.promise;
    });
    
    callbackDeferred.resolve("ignored");
    
    return result.then(function(value: any) {
      expect(value).toBe("original");
    }, function() {
      throw new Error("should not reject");
    });
  });
});