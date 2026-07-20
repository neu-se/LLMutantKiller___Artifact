import { pull } from '../../../../../../../../subject_repositories/pull-stream/pull.js';

describe('pull', () => {
  it('should throw an error when s is an object but not a function', () => {
    const read = () => {};
    const s = {};
    expect(() => pull(read, s)).toThrowError();
  });
});