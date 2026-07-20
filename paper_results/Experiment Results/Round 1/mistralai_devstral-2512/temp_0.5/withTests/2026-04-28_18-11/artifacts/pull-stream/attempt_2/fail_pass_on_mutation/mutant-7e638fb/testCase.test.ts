const prop = require("../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js");

describe('prop function with regex key', () => {
  it('should correctly identify regex objects and use their exec method', () => {
    const regex = /test/;
    const propFn = prop(regex);
    const testData = "this is a test";

    const result = propFn(testData);

    expect(result).toBe("test");
  });
});