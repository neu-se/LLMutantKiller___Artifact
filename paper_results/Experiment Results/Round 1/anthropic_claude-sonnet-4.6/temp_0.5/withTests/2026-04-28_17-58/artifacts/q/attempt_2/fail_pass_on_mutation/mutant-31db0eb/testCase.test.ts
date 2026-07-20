import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q module loads and nextTick works correctly", () => {
  it("should execute nextTick tasks in order without errors", (done) => {
    const order: number[] = [];

    Q.nextTick(() => { order.push(1); });
    Q.nextTick(() => { order.push(2); });
    Q.nextTick(() => {
      order.push(3);
      expect(order).toEqual([1, 2, 3]);
      done();
    });
  });
});