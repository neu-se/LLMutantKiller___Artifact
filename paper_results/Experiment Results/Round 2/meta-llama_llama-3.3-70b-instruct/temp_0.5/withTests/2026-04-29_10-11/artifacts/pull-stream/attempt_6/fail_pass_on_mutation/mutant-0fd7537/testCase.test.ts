import prop from '../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js';

describe('prop function', () => {
  it('should not return the object when key is an object with exec function', () => {
    const data = { a: 1, b: 2 };
    const key = { exec: () => {} };
    const result = prop(key)(data);
    expect(result).not.toBe(key);
  });
});