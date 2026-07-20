import { prop } from '../../../../util/prop';

describe('prop function', () => {
  it('should return a function that returns the specified property of an object when key is a string', () => {
    const obj = { foo: 'bar' };
    const result = prop('foo')(obj);
    expect(result).toBe('bar');
  });

  it('should return the matched string when key is a RegExp object and object is a string', () => {
    const obj = 'hello world';
    const key = /world/;
    const result = prop(key)(obj);
    expect(result).toBe('world');
  });

  it('should return the key itself when key is not a string or RegExp', () => {
    const obj = {};
    const key = {};
    const result = prop(key)(obj);
    expect(result).toBe(key);
  });

  it('should behave differently when key is a RegExp object and object is not a string in the mutated code', () => {
    const obj = {};
    const key = /world/;
    const result = prop(key)(obj);
    expect(typeof result).toBe('object');
  });
});