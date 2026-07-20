const prop = require("../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js");

describe("prop function with regex key", () => {
  it("should correctly identify objects with exec method as regex", () => {
    const regexLike = { exec: () => ["match"] };
    const data = "test data";
    const propFn = prop(regexLike);
    const result = propFn(data);
    expect(result).toBe("match");
  });
});