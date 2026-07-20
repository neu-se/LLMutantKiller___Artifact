import { prop } from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop";

describe('prop function', () => {
  it('should return a function that returns the value of the given key when key is a string', () => {
    const obj = { foo: 'bar' };
    const result = prop('foo')(obj);
    expect(result).toBe('bar');
  });

  it('should return a function when key is a string', () => {
    const key = 'foo';
    const result = prop(key);
    expect(typeof result).toBe('function');
  });

  it('should return the original value when key is not a string and not a RegExp', () => {
    const key = 123;
    const result = prop(key);
    expect(result).toBe(123);
  });
});