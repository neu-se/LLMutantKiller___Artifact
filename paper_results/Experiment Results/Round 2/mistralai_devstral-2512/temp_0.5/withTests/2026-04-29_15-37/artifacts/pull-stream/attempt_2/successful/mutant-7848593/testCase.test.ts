const prop = require("../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js");

describe('prop function with regex key', () => {
  it('should return a function that extracts matches when key is a regex', () => {
    const regex = /hello (\w+)/;
    const getMatch = prop(regex);
    const data = "hello world";
    const result = getMatch(data);
    expect(result).toBe("hello world");
  });
});