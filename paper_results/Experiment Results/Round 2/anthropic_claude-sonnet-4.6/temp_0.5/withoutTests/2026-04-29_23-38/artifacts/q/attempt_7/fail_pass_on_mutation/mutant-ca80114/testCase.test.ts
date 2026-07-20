import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should resolve promises in sequence with all", async () => {
    const order: number[] = [];
    const p1 = Q.Promise((resolve: Function) => { order.push(1); resolve(1); });
    const p2 = Q.Promise((resolve: Function) => { order.push(2); resolve(2); });
    const results = await Q.all([p1, p2]);
    expect(results).toEqual([1, 2]);
    expect(order).toEqual([1, 2]);
  });
});