import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q flush continues after error in non-node environment", () => {
  it("should process remaining queued nextTick tasks even when one throws", done => {
    const results: number[] = [];

    // Suppress the uncaught exception that will be thrown asynchronously
    const uncaughtHandler = (err: Error) => { /* suppress */ };
    process.on("uncaughtException", uncaughtHandler);

    Q.nextTick(() => { throw new Error("boom"); });
    Q.nextTick(() => { results.push(1); });

    setTimeout(() => {
      process.removeListener("uncaughtException", uncaughtHandler);
      // Original: async throw, flush continues, results = [1]
      // Mutated: sync throw, flush aborts, results = []
      expect(results).toEqual([1]);
      done();
    }, 300);
  });
});