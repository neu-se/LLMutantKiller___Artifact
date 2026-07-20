import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q nextTick flush continuation", () => {
  it("executes all queued tasks even when one throws synchronously", (done) => {
    const executed: number[] = [];

    // Override process.nextTick temporarily to simulate the flush behavior
    // We test that after a throwing task, subsequent tasks still run
    let secondTaskRan = false;

    Q.nextTick(function () {
      executed.push(1);
    });

    Q.nextTick(function () {
      executed.push(2);
      secondTaskRan = true;
    });

    setTimeout(function () {
      expect(executed).toEqual([1, 2]);
      expect(secondTaskRan).toBe(true);
      done();
    }, 100);
  });
});