import { prop } from '../../../../../../../../../../../subject_repositories/pull-stream/util/prop';

describe('prop function', () => {
  it('should return a function that returns the value of the given key when key is a string', () => {
    const obj = { foo: 'bar' };
    const result = prop('foo')(obj);
    expect(result).toBe('bar');
  });

  it('should return function when key is a string in the original code and not in the mutated code', () => {
    const key = 'foo';
    const result = prop(key);
    expect(typeof result).toBe('function');
  });
});