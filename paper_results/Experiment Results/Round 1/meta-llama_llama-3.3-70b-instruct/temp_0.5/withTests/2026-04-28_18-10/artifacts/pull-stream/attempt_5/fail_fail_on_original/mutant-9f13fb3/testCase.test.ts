import prop from '../../util/prop';

describe('prop function', () => {
  it('should return a function that returns the value of a property when the key is a string', () => {
    const obj = { foo: 'bar' };
    const propFunc = prop('foo');
    expect(propFunc(obj)).toBe('bar');
  });

  it('should return undefined when the key is not a string and not a regexp and the condition is false', () => {
    const obj = { foo: 'bar' };
    const propFunc = prop(false);
    expect(propFunc(obj)).toBeUndefined();
  });
});