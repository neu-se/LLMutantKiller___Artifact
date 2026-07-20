import prop from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe("prop utility function", () => {
  it("should return undefined when key is a non-regexp object without exec method", () => {
    // In the original code, the condition checks for 'object' === typeof key && 'function' === typeof key.exec
    // In the mutated code, the condition is 'object' === typeof key && true
    // This means in the mutated code, any object (including plain objects) would be treated as a regexp
    // and the function would try to call key.exec(data), which would fail or behave differently
    
    // A plain object (not a regexp) should be returned as-is (the fallback : key case)
    // In original: typeof key === 'object' && typeof key.exec !== 'function' => falls to : key => returns key itself
    // In mutated: typeof key === 'object' && true => treats it as regexp, tries key.exec(data)
    
    const plainObject = { someProperty: "value" };
    const result = prop(plainObject);
    
    // In the original code, plainObject has no exec method, so condition is false,
    // and prop returns plainObject itself (the : key branch)
    // Then calling result("test") would return plainObject
    expect(result).toBe(plainObject);
    
    // In the mutated code, the condition 'object' === typeof key && true is true for any object,
    // so it returns a function that calls key.exec(data)
    // Since plainObject.exec is undefined, calling result("test") would throw a TypeError
    // But more importantly, result itself would be a function, not the plainObject
    // So result !== plainObject would be true in mutated code
  });
});