import { prop } from '../../../util/prop';

describe('prop function', () => {
  it('should return a function that returns the value of a property', () => {
    const obj = { a: 1, b: 2 };
    const func = prop('a');
    expect(func(obj)).toBe(1);
  });

  it('should return a function that returns the first match of a regular expression', () => {
    const obj = 'hello world';
    const func = prop(/world/);
    expect(func(obj)).toBe('world');
  });

  it('should return the original value if it is not an object or a string', () => {
    const obj = 123;
    const func = prop(obj);
    expect(func({})).toBe(obj);
  });

  it('should throw an error when the mutation is present', () => {
    const obj = {};
    const func = prop(obj);
    expect(() => func('')).toThrowError();
  });

  it('should pass when the input is a string and the key is a regular expression', () => {
    const obj = 'hello world';
    const func = prop(/world/);
    expect(func(obj)).toBe('world');
  });

  it('should fail when the mutation is present and the input is an object', () => {
    const obj = { a: 1 };
    const func = prop(obj);
    expect(() => func('')).toThrowError();
  });
});