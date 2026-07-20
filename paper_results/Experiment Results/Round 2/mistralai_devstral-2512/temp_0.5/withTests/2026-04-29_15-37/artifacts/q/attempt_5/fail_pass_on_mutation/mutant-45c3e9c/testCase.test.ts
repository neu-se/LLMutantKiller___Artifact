import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nextTick behavior", () => {
  it("should flush the task queue when tasks are added", (done) => {
    let executionOrder: string[] = [];

    Q.nextTick(() => {
      executionOrder.push("first");
    });

    // Force a flush by checking if tasks are being executed
    setTimeout(() => {
      Q.nextTick(() => {
        executionOrder.push("second");
        expect(executionOrder).toEqual(["first", "second"]);
        done();
      });
    }, 0);

    // This should trigger the flush in original code but not in mutated code
    expect(executionOrder.length).toBe(0);
  });
});