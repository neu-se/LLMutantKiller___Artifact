import { prop } from '../../../util/prop';

describe('prop function', () => {
  it('should return a function that returns the value of a property when the key is a string and the condition is true', () => {
    const obj = { foo: 'bar' };
    const propFunc = prop('foo');
    expect(propFunc(obj)).toBe('bar');
  });

  it('should return the key when the condition is false', () => {
    const key = 'foo';
    const propFunc = prop(key);
    const obj = {};
    expect(propFunc(obj)).toBe(key);
  });
});