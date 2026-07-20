import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeNodeResolver mutation test", () => {
  it("should handle more than 2 arguments correctly", (done) => {
    const deferred = Q.defer();
    const resolver = deferred.makeNodeResolver();

    // Call with 3 arguments (error, value1, value2)
    resolver(null, "arg1", "arg2");

    deferred.promise.then((result: any) => {
      // Should resolve with array of arguments after error
      expect(Array.isArray(result)).toBe(true);
      expect(result).toEqual(["arg1", "arg2"]);
      done();
    }).catch((err: any) => {
      done(err);
    });
  });
});