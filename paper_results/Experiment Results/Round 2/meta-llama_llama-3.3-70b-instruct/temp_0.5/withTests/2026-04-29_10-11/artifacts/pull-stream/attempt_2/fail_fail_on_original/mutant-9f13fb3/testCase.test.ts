import { prop } from '../../../../../../../../../../subject_repositories/pull-stream/util/prop';

describe('prop function', () => {
  it('should return a function that returns the value of the given key when key is a string', () => {
    const obj = { foo: 'bar' };
    const result = prop('foo')(obj);
    expect(result).toBe('bar');
  });

  it('should return undefined when key is not a string and not a RegExp in the mutated code', () => {
    const result = prop(false)(null);
    expect(result).toBe(false);
  });
});