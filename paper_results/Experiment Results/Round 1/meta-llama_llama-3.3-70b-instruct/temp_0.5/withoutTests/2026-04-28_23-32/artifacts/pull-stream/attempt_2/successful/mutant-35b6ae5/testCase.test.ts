import prop from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe('prop function', () => {
  it('should return null when regex does not match', () => {
    const key = /test/;
    const data = 'example';
    const propFunction = prop(key);
    expect(propFunction(data)).toBe(null);
  });
});