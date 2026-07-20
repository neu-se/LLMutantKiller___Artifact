import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("null rejection reason with long stack support", () => {
  it("should call rejection handler when reason is null", () => {
    jest.setTimeout(1000);
    Q.longStackSupport = true;
    
    const deferred = Q.defer();
    const result = deferred.promise.then(null, (reason) => "caught");
    deferred.reject(null);
    
    return result.then((val) => {
      Q.longStackSupport = false;
      expect(val).toBe("caught");
    });
  });
});