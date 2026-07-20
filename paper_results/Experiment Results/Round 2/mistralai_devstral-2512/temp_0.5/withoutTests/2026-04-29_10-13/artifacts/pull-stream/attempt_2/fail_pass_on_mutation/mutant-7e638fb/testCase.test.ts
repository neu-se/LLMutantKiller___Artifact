const prop = require("../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js");

describe('prop function with regex key', () => {
  it('should return a function that extracts the first match when key is a regex', () => {
    const regex = /hello (\w+)/;
    const data = "hello world";
    const getValue = prop(regex);
    const result = getValue(data);
    expect(result).toBe("hello world");
  });
});