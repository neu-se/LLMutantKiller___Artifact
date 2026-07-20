import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nextTick behavior", () => {
  it("should execute tasks asynchronously and maintain order", (done) => {
    const results: number[] = [];

    // Add multiple tasks
    Q.nextTick(() => {
      results.push(1);
    });

    Q.nextTick(() => {
      results.push(2);
    });

    // Check after a delay
    setTimeout(() => {
      try {
        expect(results).toEqual([1, 2]);
        done();
      } catch (error) {
        done(error);
      }
    }, 10);
  });
});