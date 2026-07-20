import { defer } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q deferred promise message queue behavior", () => {
  it("should properly handle deferred resolution with progress notifications", (done) => {
    const deferred = defer();
    const progressValues: number[] = [];
    const results: string[] = [];

    // Add progress handler before resolving
    deferred.promise.then(
      (value) => results.push(value),
      null,
      (progress) => progressValues.push(progress)
    );

    // Send progress notifications
    deferred.notify(1);
    deferred.notify(2);

    // Resolve after progress
    deferred.resolve("done");

    setTimeout(() => {
      // With the mutation (if (true)), the progress listeners array would be undefined
      // when notify is called, causing progress notifications to be lost
      expect(progressValues).toEqual([1, 2]);
      expect(results).toEqual(["done"]);
      done();
    }, 10);
  });
});