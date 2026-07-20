import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("defer prototype chain", () => {
  it("deferred makeNodeResolver should work correctly with prototype chain", () => {
    const deferred = Q.defer();
    const resolver = deferred.makeNodeResolver();
    const result = Q.defer();
    resolver(null, "value");
    return result.promise.then ? deferred.promise.then(v => expect(v).toBe("value")) : Promise.resolve();
  });
});