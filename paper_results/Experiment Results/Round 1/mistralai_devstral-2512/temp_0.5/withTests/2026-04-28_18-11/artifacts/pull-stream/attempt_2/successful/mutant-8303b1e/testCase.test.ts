const prop = require("../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js");

describe("prop function with regex key", () => {
  it("should return a function that extracts match when key is a regex", () => {
    const regexKey = /test/;
    const data = "this is a test";
    const getProp = prop(regexKey);
    const result = getProp(data);
    expect(result).toBe("test");
  });
});