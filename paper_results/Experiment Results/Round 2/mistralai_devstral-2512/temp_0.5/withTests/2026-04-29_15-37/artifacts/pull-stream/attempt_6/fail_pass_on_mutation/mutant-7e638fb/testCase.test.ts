const prop = require("../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js");

describe("prop function with regex key", () => {
  it("should correctly handle regex objects with exec method", () => {
    const regex = /hello/;
    const data = "hello world";
    const propFn = prop(regex);
    const result = propFn(data);
    expect(result).toBe("hello");
  });
});