import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q progress listeners on pending promises", () => {
  it("should call progress listeners when deferred.notify is called before resolution", async () => {
    const deferred = Q.defer();
    const progressValues: number[] = [];

    // Attach progress listener via .then() on the pending promise
    deferred.promise.then(
      null,
      null,
      function (value: number) {
        progressValues.push(value);
      }
    );

    // Notify progress - in original code, the progress listener is stored
    // In mutated code, the progress listener is NOT stored (the push is removed)
    deferred.notify(42);
    deferred.notify(100);

    // Resolve the promise
    deferred.resolve("done");

    // Wait for async operations to complete
    await deferred.promise;

    // Give time for progress notifications to be processed
    await new Promise<void>((resolve) => setTimeout(resolve, 50));

    // In original code: progressValues should contain [42, 100]
    // In mutated code: progressValues should be empty [] because listeners were never stored
    expect(progressValues).toEqual([42, 100]);
  });
});