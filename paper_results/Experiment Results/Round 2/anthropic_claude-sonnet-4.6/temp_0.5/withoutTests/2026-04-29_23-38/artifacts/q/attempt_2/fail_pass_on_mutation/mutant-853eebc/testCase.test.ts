import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_map internal behavior", () => {
  it("should correctly map values when using Q.promised with multiple arguments", async () => {
    // Q.promised uses array_map via spread/all on arguments
    // The mutation makes array_map return [undefined, undefined, ...] instead of mapped values
    const add = Q.promised(function(a: number, b: number) {
      return a + b;
    });

    const result = await add(1, 2);
    
    // With original code: result = 3
    // With mutated code: array_map returns undefineds, so args would be [undefined, undefined]
    // and the function would return NaN or undefined
    expect(result).toBe(3);
  });
});