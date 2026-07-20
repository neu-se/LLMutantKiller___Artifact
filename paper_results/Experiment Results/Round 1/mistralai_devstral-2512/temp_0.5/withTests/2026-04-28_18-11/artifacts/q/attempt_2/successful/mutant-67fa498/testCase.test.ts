import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("laterQueue processing", () => {
  it("should process tasks in the laterQueue after the main queue", (done) => {
    let executionOrder: string[] = [];

    // Schedule a task in the main queue
    Q.nextTick(() => {
      executionOrder.push("main");
    });

    // Schedule a task in the laterQueue
    (Q.nextTick as any).runAfter(() => {
      executionOrder.push("later");
    });

    // Wait for both queues to be processed
    setTimeout(() => {
      expect(executionOrder).toEqual(["main", "later"]);
      done();
    }, 100);
  });
});