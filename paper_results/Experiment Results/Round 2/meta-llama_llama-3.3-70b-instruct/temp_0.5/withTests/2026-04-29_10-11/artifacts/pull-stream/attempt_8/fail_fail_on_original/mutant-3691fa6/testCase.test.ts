import { prop } from '../../../util/prop';

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

  it('should return undefined when key is a RegExp object and object is not a string', () => {
    const obj = {};
    const key = /world/;
    const result = prop(key)(obj);
    expect(result).toBeUndefined();
  });
});