import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.all resolves fulfilled promise values correctly", () => {
  it("should replace fulfilled promises with their values in the result array", async () => {
    // Q.all uses array_reduce to iterate over promises and extract values.
    // With the mutation, the reduce callback never runs, so promises[index]
    // is never replaced with snapshot.value, and the result array still
    // contains the original promise objects instead of their resolved values.
    const p1 = Q.resolve(10);
    const p2 = Q.resolve(20);
    const p3 = Q.resolve(30);

    const result = await Q.all([p1, p2, p3]);

    // On original code: [10, 20, 30]
    // On mutated code: the reduce callback never fires, pendingCount stays 0,
    // deferred.resolve(promises) is called with the original promise objects
    expect(result[0]).toBe(10);
    expect(result[1]).toBe(20);
    expect(result[2]).toBe(30);
  });
});