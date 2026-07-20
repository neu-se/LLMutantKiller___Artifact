import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise valueOf", () => {
  it("returns the fulfilled value (not the promise) when calling valueOf on a fulfilled promise", () => {
    const value = 42;
    const fulfilledPromise = Q(value);
    // Original: state === "rejected" means valueOf returns promise for pending/rejected, value for fulfilled
    // Mutated: state !== "rejected" means valueOf returns promise for pending/fulfilled, value for rejected
    const result = fulfilledPromise.valueOf();
    expect(result).toBe(value);
  });
});