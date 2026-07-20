const prop = require("../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js");

describe("prop function with regex key", () => {
  it("should correctly handle regex objects with exec method", () => {
    const regex = /test/;
    const data = "this is a test string";
    const propFn = prop(regex);
    const result = propFn(data);
    expect(result).toBe("test");
  });
});