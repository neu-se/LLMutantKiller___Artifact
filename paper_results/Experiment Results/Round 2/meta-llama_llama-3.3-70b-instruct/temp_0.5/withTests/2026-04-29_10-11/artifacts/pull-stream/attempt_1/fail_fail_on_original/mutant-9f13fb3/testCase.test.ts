import { prop } from '../../../util/prop';

describe('prop function', () => {
  it('should return a function that returns the value of the given key when key is a string', () => {
    const obj = { foo: 'bar' };
    const result = prop('foo')(obj);
    expect(result).toBe('bar');
  });

  it('should return the key itself when key is not a string', () => {
    const result = prop(123)(null);
    expect(result).toBe(123);
  });

  it('should return a function that returns the first match of the given key when key is a RegExp', () => {
    const obj = 'hello world';
    const result = prop(/world/)(obj);
    expect(result).toBe('world');
  });
});