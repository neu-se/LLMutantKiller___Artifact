import { Q } from "./q.js";

describe("Q.any progress notifications", () => {
  it("should notify progress from rejected promises", (done) => {
    const deferred1 = Q.defer();
    const deferred2 = Q.defer();
    const progressValues: Array<{ index: number; value: any }> = [];

    // Set up a progress listener
    Q.any([deferred1.promise, deferred2.promise]).progress((progress) => {
      progressValues.push(progress);
    });

    // Reject first promise with progress
    deferred1.notify("progress1");
    deferred1.reject(new Error("Failed 1"));

    // Reject second promise with progress
    deferred2.notify("progress2");
    deferred2.reject(new Error("Failed 2"));

    // Give time for progress notifications to be processed
    setTimeout(() => {
      // Should have received progress notifications
      expect(progressValues.length).toBeGreaterThan(0);
      expect(progressValues.some(p => p.value === "progress1" || p.value === "progress2")).toBe(true);
      done();
    }, 50);
  });
});