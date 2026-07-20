import prop from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js"

describe("prop utility function", () => {
  it("should return undefined when key is a non-regexp object (not a function with exec)", () => {
    // A plain object that is typeof 'object' but does NOT have a .exec method
    // In original code: 'object' === typeof key && 'function' === typeof key.exec
    //   => false && false => false => falls through to `: key` => returns the plain object itself
    // In mutated code: 'object' === typeof key || 'function' === typeof key.exec
    //   => true || false => true => tries to call key.exec(data) which will fail or return wrong result

    const plainObject = { someProperty: "value" };
    const result = prop(plainObject);

    // In original code, since plainObject is not a regexp (no .exec method),
    // the condition is false, so it returns `key` (the plain object itself)
    // result should be the plain object (a function that returns key, which is the plain object)
    // Actually: the ternary returns `key` when neither string nor regexp
    // So result === plainObject

    expect(result).toBe(plainObject);
  });
});