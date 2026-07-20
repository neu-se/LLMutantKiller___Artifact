import prop from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe("prop utility", () => {
  it("should return the key itself when key is a plain object without exec method", () => {
    // A plain object is typeof 'object' but has no .exec method
    // Original code: 'object' === typeof key && 'function' === typeof key.exec
    //   -> false (no exec), so returns key itself
    // Mutated code: 'object' === typeof key || 'function' === typeof key.exec
    //   -> true (is object), so returns function that calls key.exec(data)
    //   -> key.exec(data) would throw TypeError since key.exec is not a function
    const plainObject = { someProperty: "value" };
    const result = prop(plainObject);
    
    // In original code, result should be the plain object itself (the fallback case)
    expect(result).toBe(plainObject);
    
    // In mutated code, result would be a function that tries to call plainObject.exec(data)
    // which would throw a TypeError when invoked
    if (typeof result === "function") {
      // If we got a function (mutated behavior), calling it should expose the mutation
      expect(() => (result as Function)({ someProperty: "value" })).toThrow(TypeError);
    }
  });
});