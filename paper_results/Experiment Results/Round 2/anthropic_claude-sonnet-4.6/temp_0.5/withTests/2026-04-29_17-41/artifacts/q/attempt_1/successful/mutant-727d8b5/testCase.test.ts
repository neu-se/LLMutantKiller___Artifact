import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any progress notifications", () => {
  it("should send { index, value } progress updates when promises notify", async () => {
    const deferred1 = Q.defer();
    const deferred2 = Q.defer();

    const progressValues: Array<{ index: number; value: string }> = [];

    const anyPromise = Q.any([deferred1.promise, deferred2.promise]);

    anyPromise.then(
      undefined,
      undefined,
      function (progressValue: { index: number; value: string }) {
        progressValues.push(progressValue);
      }
    );

    // Notify progress on deferred1
    deferred1.notify("a");

    // Resolve deferred2 to fulfill the any promise
    deferred2.resolve("done");

    // Wait for the promise to settle
    await anyPromise;

    // Wait a bit more for progress notifications to propagate
    await new Promise<void>((resolve) => setTimeout(resolve, 50));

    expect(progressValues.length).toBeGreaterThan(0);
    expect(progressValues[0]).toEqual({ index: 0, value: "a" });
  });
});