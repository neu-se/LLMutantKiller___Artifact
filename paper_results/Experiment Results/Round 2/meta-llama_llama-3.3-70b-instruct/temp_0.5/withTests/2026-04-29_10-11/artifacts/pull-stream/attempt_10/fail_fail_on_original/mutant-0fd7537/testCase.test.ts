import prop from '../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js';

describe('prop function', () => {
  it('should return the original value when key is an object without exec function and not a string', () => {
    const data = { a: 1, b: 2 };
    const key = {};
    const result = prop(key)(data);
    expect(result).toBe(key);
  });
});