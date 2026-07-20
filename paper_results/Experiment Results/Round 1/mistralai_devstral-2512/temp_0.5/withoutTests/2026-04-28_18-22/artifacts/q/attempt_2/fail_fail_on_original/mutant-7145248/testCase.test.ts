import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.makeNodeResolver mutation test", () => {
  it("should correctly handle Node-style callbacks with more than 2 arguments", (done) => {
    const deferred = Q.defer();
    const resolver = deferred.makeNodeResolver();

    // Simulate a Node-style callback with 3 arguments (error, result1, result2)
    resolver(null, "arg1", "arg2");

    deferred.promise.then((result: any) => {
      // The original code should resolve with ["arg1", "arg2"]
      // The mutated code would incorrectly resolve with ["arg1", "arg2"] when it shouldn't
      expect(result).toEqual(["arg1", "arg2"]);
      done();
    }).catch((err: any) => {
      done(err);
    });
  });
});