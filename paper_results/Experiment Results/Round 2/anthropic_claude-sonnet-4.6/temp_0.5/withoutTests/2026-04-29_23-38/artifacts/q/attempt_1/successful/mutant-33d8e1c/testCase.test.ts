import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q progress propagation", () => {
  it("should propagate progress notifications through then() with a progress handler", async () => {
    const deferred = Q.defer();
    const progressValues: number[] = [];

    const promise = deferred.promise.then(
      null,
      null,
      function (value: number) {
        return value * 2;
      }
    );

    promise.then(null, null, function (value: number) {
      progressValues.push(value);
    });

    deferred.notify(5);
    deferred.notify(10);
    deferred.resolve("done");

    await deferred.promise;
    // Give microtasks/ticks time to flush
    await new Promise<void>((resolve) => setTimeout(resolve, 50));

    // With original code: progress handler transforms value (5*2=10, 10*2=20)
    // With mutated code: no progress operand is passed, so progress is never received
    expect(progressValues.length).toBeGreaterThan(0);
    expect(progressValues[0]).toBe(10);
    expect(progressValues[1]).toBe(20);
  });
});