import { defer } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeNodeResolver mutation test", () => {
  it("should correctly handle Node-style callbacks with multiple arguments", (done) => {
    const deferred = defer();
    const resolver = deferred.makeNodeResolver();

    // Simulate a Node-style callback with 3 arguments (error, arg1, arg2)
    resolver(null, "first", "second");

    deferred.promise.then((result: any) => {
      // Original code should resolve with ["first", "second"]
      // Mutated code would incorrectly not enter the else branch
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(2);
      expect(result[0]).toBe("first");
      expect(result[1]).toBe("second");
      done();
    }).catch((err: any) => {
      done(err);
    });
  });
});