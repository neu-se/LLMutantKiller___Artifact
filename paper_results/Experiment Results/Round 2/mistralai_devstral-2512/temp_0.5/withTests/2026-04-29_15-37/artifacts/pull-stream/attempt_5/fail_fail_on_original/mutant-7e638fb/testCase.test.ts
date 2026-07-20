const prop = require("../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js");

describe("prop function with object key", () => {
  it("should return the key itself when it's an object without exec method", () => {
    const key = { foo: "bar" };
    const propFn = prop(key);
    expect(typeof propFn).toBe("function");
    const result = propFn({});
    expect(result).toBe(key);
  });
});