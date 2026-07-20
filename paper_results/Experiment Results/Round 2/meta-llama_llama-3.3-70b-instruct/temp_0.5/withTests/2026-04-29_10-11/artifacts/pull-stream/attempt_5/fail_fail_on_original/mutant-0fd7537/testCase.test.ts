import prop from '../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js';

describe('prop function', () => {
  it('should throw an error when key is an object with exec function in the mutated code', () => {
    const data = { a: 1, b: 2 };
    const key = { exec: () => {} };
    expect(() => prop(key)(data)).toThrow();
  });
});