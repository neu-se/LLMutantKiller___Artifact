import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nextTick behavior", () => {
  it("should execute multiple tasks in order", (done) => {
    const results: number[] = [];
    Q.nextTick(() => {
      results.push(1);
    });
    Q.nextTick(() => {
      results.push(2);
    });
    Q.nextTick(() => {
      results.push(3);
      expect(results).toEqual([1, 2, 3]);
      done();
    });
  });
});