import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_reduce sparse array handling via Q.all", () => {
  it("should correctly handle a sparse array where first element is missing", async () => {
    // Create a sparse array where index 0 is missing
    const sparse: any[] = [];
    sparse[1] = Q.resolve(42);
    sparse[2] = Q.resolve(99);
    // sparse[0] is a hole (not undefined assignment, but actual hole)
    
    // Q.all uses array_reduce internally; with sparse array,
    // the result should have undefined at index 0 and values at 1 and 2
    const result = await Q.all(sparse);
    
    expect(result[0]).toBeUndefined();
    expect(result[1]).toBe(42);
    expect(result[2]).toBe(99);
  });
});