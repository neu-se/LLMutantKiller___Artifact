const prop = require("../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js");

describe('prop function with regex key', () => {
  it('should return the matched substring when using a regex key', () => {
    const regex = /hello (\w+)/;
    const data = "hello world";
    const getProp = prop(regex);
    const result = getProp(data);
    expect(result).toBe("hello world");
  });
});