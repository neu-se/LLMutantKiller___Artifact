import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("rejection handling", () => {
  it("a rejected promise that is caught does not throw when done is called on the catch result", () => {
    Q.resetUnhandledRejections();
    
    const deferred = Q.defer();
    
    const result = deferred.promise
      .then(null, function(reason) {
        return "recovered: " + reason;
      });
    
    deferred.reject("oops");
    
    return result.then(function(value) {
      expect(value).toBe("recovered: oops");
      expect(Q.getUnhandledReasons().length).toEqual(0);
    });
  });
});