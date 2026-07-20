import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("nextTick scheduling via setImmediate", () => {
  it("should successfully resolve a deferred promise using async scheduling", (done) => {
    const deferred = Q.defer();
    
    let resolved = false;
    
    deferred.promise.then((value: unknown) => {
      resolved = true;
      expect(value).toBe(42);
      expect(resolved).toBe(true);
      done();
    }).catch((err: unknown) => {
      done(err);
    });
    
    deferred.resolve(42);
  });
});