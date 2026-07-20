import prop from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe("prop utility function", () => {
  it("should return undefined when key is a plain object without exec method", () => {
    // In the original code, a plain object without 'exec' method returns the key itself
    // because the condition checks: 'object' === typeof key && 'function' === typeof key.exec
    // For a plain object without exec, this is false, so it falls through to ': key' (returns key itself)
    //
    // In the mutated code, the condition is: 'object' === typeof key && true
    // which is true for ANY object, so a plain object without exec would be treated as a regexp
    // and return a function that calls key.exec(data) - which would throw or behave differently

    const plainObject = { someProperty: "value" };
    const result = prop(plainObject);

    // In original: plainObject has no exec method, so condition is false, returns plainObject itself
    // In mutated: condition is true (object && true), returns a function that calls plainObject.exec(data)
    // which would be undefined() and throw a TypeError

    // The original returns the key itself (the plain object)
    expect(result).toBe(plainObject);
  });
});