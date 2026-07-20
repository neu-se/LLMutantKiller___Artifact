const prop = require("../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js");

describe('prop function with regex key', () => {
  it('should return null when regex does not match', () => {
    const regex = /hello (\w+)/;
    const data = "goodbye world";
    const getProp = prop(regex);
    const result = getProp(data);
    expect(result).toBeNull();
  });
});