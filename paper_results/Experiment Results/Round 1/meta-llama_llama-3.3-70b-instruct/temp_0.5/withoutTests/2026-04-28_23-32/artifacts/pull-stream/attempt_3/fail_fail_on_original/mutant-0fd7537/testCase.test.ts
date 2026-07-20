import prop from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe('prop function', () => {
  it('should not treat an object without exec method as a regex', () => {
    const key = {};
    const data = 'test';
    expect(prop(key)(data)).toBe(key);
  });
});