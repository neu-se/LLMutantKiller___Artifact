import prop from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe("prop utility with plain object key", () => {
  it("should return the key itself when key is a plain object without an exec method", () => {
    // A plain object (not a regexp) should be returned as-is (the `: key` branch)
    // Original: 'object' === typeof key && 'function' === typeof key.exec → false for plain obj → returns key
    // Mutated:  'object' === typeof key || 'function' === typeof key.exec → true for plain obj → returns function using .exec
    const plainObj = { someProperty: 42 };
    const result = prop(plainObj);
    // In the original code, since plainObj has no .exec method,
    // the condition fails and `key` (plainObj) is returned directly
    expect(result).toBe(plainObj);
  });
});