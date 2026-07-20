import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q nextTick scheduling", () => {
  it("should execute nextTick callbacks in order", (done) => {
    const results: number[] = [];
    Q.nextTick(() => { results.push(1); });
    Q.nextTick(() => { results.push(2); });
    Q.nextTick(() => {
      expect(results).toEqual([1, 2]);
      done();
    });
  });
});