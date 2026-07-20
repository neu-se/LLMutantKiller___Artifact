import prop from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe('prop function', () => {
  it('should treat a string as a property key', () => {
    const key = 'test';
    const data = { test: 'value' };
    expect(prop(key)(data)).toBe('value');
  });
});