import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nextTick error handling", () => {
  it("should process tasks added after a domain-associated task completes", (done) => {
    const results: number[] = [];

    // Add tasks sequentially  
    Q.nextTick(() => {
      results.push(1);
    });

    Q.nextTick(() => {
      results.push(2);
    });

    Q.nextTick(() => {
      results.push(3);
      try {
        expect(results).toEqual([1, 2, 3]);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
});