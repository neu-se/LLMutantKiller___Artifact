import { defer } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q deferred promise message queue behavior", () => {
  it("should properly handle multiple then calls before resolution", (done) => {
    const deferred = defer();
    const results: string[] = [];

    // Add multiple then handlers before resolving
    deferred.promise.then((value) => {
      results.push(value);
      return "first";
    });

    deferred.promise.then((value) => {
      results.push(value);
      return "second";
    });

    // Resolve after adding handlers
    deferred.resolve("initial");

    setTimeout(() => {
      // With the mutation (if (true)), messages would be undefined
      // and the chaining behavior would break
      expect(results).toEqual(["initial", "initial"]);
      done();
    }, 20);
  });
});