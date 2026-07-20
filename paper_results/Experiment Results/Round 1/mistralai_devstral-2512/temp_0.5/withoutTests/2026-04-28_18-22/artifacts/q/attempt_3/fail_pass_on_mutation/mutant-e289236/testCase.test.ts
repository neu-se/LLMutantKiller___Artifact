import { defer } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q deferred promise message handling", () => {
  it("should properly queue and process multiple messages before resolution", (done) => {
    const deferred = defer();
    const results: string[] = [];

    // Add multiple handlers before resolving
    deferred.promise.then((value) => {
      results.push(value);
    });
    deferred.promise.then((value) => {
      results.push(value);
    });

    // Resolve after adding handlers
    deferred.resolve("test");

    // Check that both handlers were called
    setTimeout(() => {
      expect(results).toEqual(["test", "test"]);
      done();
    }, 10);
  });
});