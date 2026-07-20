import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nextTick behavior", () => {
  it("should execute tasks in the next tick", (done) => {
    let immediateValue = 0;
    let nextTickValue = 0;

    // This should execute immediately
    immediateValue = 1;

    // This should execute in the next tick
    Q.nextTick(() => {
      nextTickValue = 1;
      expect(immediateValue).toBe(1);
      expect(nextTickValue).toBe(1);
      done();
    });

    // At this point, nextTickValue should still be 0
    expect(nextTickValue).toBe(0);
  });
});