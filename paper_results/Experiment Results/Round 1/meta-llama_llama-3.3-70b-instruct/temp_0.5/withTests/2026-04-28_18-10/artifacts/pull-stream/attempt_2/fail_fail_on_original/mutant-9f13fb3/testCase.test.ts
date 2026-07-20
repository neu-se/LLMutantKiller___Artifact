import { prop } from '../../../util/prop';

describe('prop function', () => {
  it('should return a function that returns the value of a property', () => {
    const obj = { foo: 'bar' };
    const propFunc = prop('foo');
    expect(propFunc(obj)).toBe('bar');

    const obj2 = { foo: 'baz' };
    const propFunc2 = prop('foo');
    expect(propFunc2(obj2)).toBe('baz');
  });

  it('should return undefined when the key is not present in the object', () => {
    const obj = { foo: 'bar' };
    const propFunc = prop('qux');
    expect(propFunc(obj)).toBeUndefined();
  });

  it('should return the key when the key is not a string', () => {
    const key = 123;
    const propFunc = prop(key);
    expect(propFunc({})).toBe(key);
  });

  it('should return the key when the condition is false', () => {
    const obj = { foo: 'bar' };
    const propFunc = prop('foo');
    expect(propFunc(obj)).toBe('bar');
  });
});