import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.isFulfilled", () => {
  it("should return true for a non-promise value (plain value is considered fulfilled)", () => {
    // A plain value (non-promise) should be considered fulfilled
    // Original: !isPromise(object) || object.inspect().state === "fulfilled"
    // For non-promise: !false || ... = true || ... = true
    // Mutated: !isPromise(object) && object.inspect().state === "fulfilled"
    // For non-promise: !false && ... = true && (would try to call .inspect() on plain value, but since short-circuit... wait)
    // Actually for non-promise with &&: true && object.inspect().state === "fulfilled"
    // But plain objects don't have .inspect(), so it would throw or return false
    // Let's test with a plain value - the original returns true, mutated would throw or return false
    
    const plainValue = 42;
    const result = Q.isFulfilled(plainValue);
    expect(result).toBe(true);
  });
});