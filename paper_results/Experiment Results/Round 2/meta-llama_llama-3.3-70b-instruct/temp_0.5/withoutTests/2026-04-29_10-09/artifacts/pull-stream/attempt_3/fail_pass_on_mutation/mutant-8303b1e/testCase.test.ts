import prop from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe('prop function', () => {
  it('should return a function when key is a string', () => {
    const key = 'test';
    expect(typeof prop(key)).toBe('function');
    expect(prop(key)({ test: 'value' })).toBe('value');
  });
});