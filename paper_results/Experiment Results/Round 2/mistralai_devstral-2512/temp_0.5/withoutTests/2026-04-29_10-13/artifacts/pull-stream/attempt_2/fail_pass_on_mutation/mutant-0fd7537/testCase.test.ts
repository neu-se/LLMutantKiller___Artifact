const prop = require("../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js");

describe('prop function with regex key', () => {
  it('should return a function that extracts the first match when key is a RegExp', () => {
    const regexKey = /hello (\w+)/;
    const extractor = prop(regexKey);
    const data = "hello world, this is a test";
    const result = extractor(data);
    expect(result).toBe("hello world");
  });
});