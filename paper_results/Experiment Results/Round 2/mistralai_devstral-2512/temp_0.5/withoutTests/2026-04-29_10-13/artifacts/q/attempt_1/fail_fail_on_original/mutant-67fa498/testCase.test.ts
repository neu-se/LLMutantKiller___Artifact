import { Q } from "./q";

describe("Q promise library", () => {
  it("should execute tasks in laterQueue after main queue", (done) => {
    let executionOrder: string[] = [];

    // Task that should run first (main queue)
    Q.nextTick(() => {
      executionOrder.push("main");
    });

    // Task that should run second (laterQueue)
    Q.nextTick.runAfter(() => {
      executionOrder.push("later");
      // Verify execution order
      expect(executionOrder).toEqual(["main", "later"]);
      done();
    });

    // Give time for tasks to execute
    setTimeout(() => {
      if (executionOrder.length === 0) {
        fail("No tasks were executed");
      }
    }, 100);
  });
});