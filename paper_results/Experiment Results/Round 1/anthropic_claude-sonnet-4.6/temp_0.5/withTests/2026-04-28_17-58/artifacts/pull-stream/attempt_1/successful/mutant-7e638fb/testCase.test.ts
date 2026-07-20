import prop from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe("prop utility function", () => {
  it("should return the key itself when key is a plain object without an exec method", () => {
    // A plain object has typeof === 'object' but no exec function
    // Original: 'object' === typeof key && 'function' === typeof key.exec
    //   -> false (since exec is not a function), so returns key itself
    // Mutated: 'object' === typeof key && true
    //   -> true, so tries to call key.exec(data) which throws TypeError
    const plainObj = { someProperty: "value" };
    
    // The original code returns the key itself when it's an object without exec
    const result = prop(plainObj);
    
    // In the original, result should be the plain object itself (the key)
    expect(result).toBe(plainObj);
    
    // Additionally, calling the result as a function should not throw
    // (In mutated code, it would try to call plainObj.exec(data) which throws)
    expect(() => {
      // result should be the key itself (plainObj), not a function
      // so just verifying result is the object is sufficient
    }).not.toThrow();
    
    // Verify result is the object itself, not a function that calls exec
    expect(typeof result).toBe("object");
    expect(result).toEqual({ someProperty: "value" });
  });
});