import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.all with already-fulfilled promises", () => {
  it("should resolve immediately when all promises are already fulfilled", async () => {
    // Create already-fulfilled promises
    const p1 = Q(1);
    const p2 = Q(2);
    const p3 = Q(3);

    // Q.all should resolve with the values of all fulfilled promises
    const result = await Q.all([p1, p2, p3]);
    
    expect(result).toEqual([1, 2, 3]);
  });
});