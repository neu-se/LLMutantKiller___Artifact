import { Q } from "./q.js";

describe("Q.makeNodeResolver mutation test", () => {
  it("should handle multiple arguments correctly in Node-style callbacks", (done) => {
    const deferred = Q.defer();
    const resolver = deferred.makeNodeResolver();

    // Simulate a Node-style callback with more than 2 arguments
    resolver(null, "arg1", "arg2", "arg3");

    deferred.promise.then((result) => {
      // The original code should resolve with ["arg1", "arg2", "arg3"]
      // The mutated code would incorrectly resolve with ["arg1", "arg2"]
      expect(result).toEqual(["arg1", "arg2", "arg3"]);
      done();
    }).catch((err) => {
      done(err);
    });
  });
});