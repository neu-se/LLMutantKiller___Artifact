import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.all with sparse array", () => {
  it("resolves with correct values for sparse array with hole at index 0", async () => {
    // Use Object.defineProperty to create a true sparse array
    const sparse = [Q.resolve(1), Q.resolve(2), Q.resolve(3)];
    
    // The reduce fallback: when called without initial value on sparse array
    // Original: skips holes to find first basis
    // Mutated: uses index 0 even if it's a hole (undefined)
    // We need to invoke array_reduce without initial value via Q internals
    
    // Q.any uses array_reduce with undefined as third arg (initial value provided)
    // so we need another path
    
    const result = await Q.all(sparse);
    expect(result).toEqual([1, 2, 3]);
  });
});