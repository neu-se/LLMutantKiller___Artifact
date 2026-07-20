import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.isFulfilled", () => {
  it("should return true for a non-promise value (plain object)", () => {
    // A plain object is not a promise, so isFulfilled should return true
    // Original: !isPromise(object) || object.inspect().state === "fulfilled"
    //   - !isPromise(plainObj) = true, so result = true (short-circuit)
    // Mutated: !isPromise(object) && object.inspect().state === "fulfilled"
    //   - !isPromise(plainObj) = true, then tries object.inspect() which doesn't exist
    //   - Actually for a plain object without inspect(), it would throw or return false
    // Let's use a plain value like a number
    const plainValue = 42;
    expect(Q.isFulfilled(plainValue)).toBe(true);
  });
});