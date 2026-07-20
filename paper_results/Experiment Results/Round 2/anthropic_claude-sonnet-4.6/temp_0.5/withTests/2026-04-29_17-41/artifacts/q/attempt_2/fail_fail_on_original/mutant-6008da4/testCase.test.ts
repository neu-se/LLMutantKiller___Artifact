import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("nextTick queue processing", () => {
  it("should process all queued tasks even when an earlier task throws", (done) => {
    const results: number[] = [];

    // Queue two tasks via nextTick
    // First task throws, second task should still run
    Q.nextTick(() => {
      results.push(1);
      throw new Error("task 1 error");
    });

    Q.nextTick(() => {
      results.push(2);
    });

    // With isNodeJS=false (original): exception is swallowed async, both tasks run -> [1, 2]
    // With isNodeJS=true (mutated): exception re-thrown synchronously interrupts flush -> [1] only
    setTimeout(() => {
      try {
        expect(results).toEqual([1, 2]);
        done();
      } catch (e) {
        done(e);
      }
    }, 200);
  });
});