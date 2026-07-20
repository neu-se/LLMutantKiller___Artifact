import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any progress notification", () => {
  it("should notify progress with index and value when a promise in any() reports progress", async () => {
    const progressNotifications: Array<{ index: number; value: unknown }> = [];

    const deferred1 = Q.defer();
    const deferred2 = Q.defer();

    const anyPromise = Q.any([deferred1.promise, deferred2.promise]);

    anyPromise.then(
      null,
      null,
      function (progress: { index: number; value: unknown }) {
        progressNotifications.push(progress);
      }
    );

    // Notify progress on the first deferred
    deferred1.notify("progress-value-1");

    // Resolve the second deferred to settle the any() promise
    deferred2.resolve("done");

    await anyPromise;

    // Give time for progress notifications to propagate
    await new Promise<void>((resolve) => setTimeout(resolve, 50));

    expect(progressNotifications.length).toBeGreaterThan(0);
    expect(progressNotifications[0]).toEqual({ index: 0, value: "progress-value-1" });
  });
});