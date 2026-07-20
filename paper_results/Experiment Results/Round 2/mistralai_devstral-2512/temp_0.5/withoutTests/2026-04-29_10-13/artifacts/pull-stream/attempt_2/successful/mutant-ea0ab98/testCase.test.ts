const prop = require("../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js");

describe("prop function with regex key", () => {
  it("should return the first match when key is a regex", () => {
    const regex = /test/;
    const data = "this is a test string";
    const getProp = prop(regex);
    const result = getProp(data);
    expect(result).toBe("test");
  });
});