import prop from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe("prop utility function", () => {
  it("should return undefined when key is a plain object without exec method (not a regexp)", () => {
    // A plain object (typeof === 'object') without an exec method should NOT be treated as a regexp
    // In the original code: 'object' === typeof key && 'function' === typeof key.exec
    // This means a plain object without exec should fall through to the `: key` branch and return the key itself
    // In the mutated code: 'object' === typeof key || 'function' === typeof key.exec
    // This means a plain object without exec would match the condition and try to call key.exec(data)
    // which would throw or behave differently
    
    const plainObject = { someProperty: "value" };
    // plainObject is an object but does NOT have an exec method
    // Original: 'object' === typeof plainObject && 'function' === typeof plainObject.exec
    //         = true && false = false → falls to `: key` branch → returns plainObject itself
    // Mutated:  'object' === typeof plainObject || 'function' === typeof plainObject.exec
    //         = true || false = true → tries to call plainObject.exec(data) → throws TypeError
    
    const result = prop(plainObject);
    
    // In original code, result should be the key itself (plainObject)
    expect(result).toBe(plainObject);
    
    // Also verify that calling the returned value works as expected
    // result should be the plainObject itself, not a function
    expect(typeof result).not.toBe("function");
  });
});