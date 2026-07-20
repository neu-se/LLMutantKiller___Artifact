import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("nextTick flush behavior after handler throws", () => {
  it("should continue processing queued tasks in the same flush even when a task throws", (done) => {
    // Schedule two tasks via nextTick
    // The first throws, the second should still run before any setTimeout
    let secondTaskRan = false;
    let setTimeoutRan = false;

    // This setTimeout represents "later" - after the current flush
    setTimeout(() => {
      setTimeoutRan = true;
      // With isNodeJS=false (original): second task ran before this setTimeout
      // With isNodeJS=true (mutated): flush was interrupted, second task deferred via setTimeout
      // so secondTaskRan may be false or may have run via another setTimeout
      expect(secondTaskRan).toBe(true);
      done();
    }, 100);

    Q.nextTick(() => {
      throw new Error("task 1 throws");
    });

    Q.nextTick(() => {
      secondTaskRan = true;
    });
  });
});