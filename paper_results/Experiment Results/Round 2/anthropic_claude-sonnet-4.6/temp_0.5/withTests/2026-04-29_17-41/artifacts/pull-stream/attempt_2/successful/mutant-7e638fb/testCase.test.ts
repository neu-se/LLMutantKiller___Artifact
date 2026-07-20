import prop from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe("prop utility with non-regexp object key", () => {
  it("should return the key itself when passed a plain object without an exec method", () => {
    // A plain object: typeof key === 'object' but typeof key.exec !== 'function'
    // Original: condition is false -> returns key itself (the object)
    // Mutated: condition is true -> tries key.exec(data) which throws TypeError
    const plainObj = { someProperty: "value" };
    const result = prop(plainObj);
    expect(result).toBe(plainObj);
  });
});