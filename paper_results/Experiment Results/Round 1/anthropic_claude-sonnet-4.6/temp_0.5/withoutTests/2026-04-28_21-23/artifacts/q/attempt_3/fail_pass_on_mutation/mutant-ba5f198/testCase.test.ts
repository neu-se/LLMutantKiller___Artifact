import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q laterQueue ordering", () => {
  it("should run runAfter tasks after regular nextTick tasks", (done) => {
    const order: string[] = [];
    
    Q.nextTick.runAfter(() => {
      order.push("after");
      expect(order).toEqual(["tick", "after"]);
      done();
    });
    
    Q.nextTick(() => {
      order.push("tick");
    });
  });
});