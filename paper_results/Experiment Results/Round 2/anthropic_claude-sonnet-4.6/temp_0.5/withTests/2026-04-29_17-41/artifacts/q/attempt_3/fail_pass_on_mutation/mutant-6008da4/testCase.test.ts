import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isNodeJS initialization", () => {
  it("should resolve promises correctly reflecting non-node-specific behavior in the tick queue setup", (done) => {
    // The mutation changes isNodeJS initial value from false to true.
    // In Node.js, isNodeJS gets set to true anyway, so behavior is identical.
    // We need to test something that differs based on the INITIAL value before
    // the Node.js detection runs - but that's not possible since it's synchronous.
    // 
    // Instead, test that laterQueue tasks run after main queue tasks.
    // This relies on the flush function working correctly.
    const order: number[] = [];

    Q.nextTick.runAfter(() => {
      order.push(2);
      expect(order).toEqual([1, 2]);
      done();
    });

    Q.nextTick(() => {
      order.push(1);
    });
  });
});