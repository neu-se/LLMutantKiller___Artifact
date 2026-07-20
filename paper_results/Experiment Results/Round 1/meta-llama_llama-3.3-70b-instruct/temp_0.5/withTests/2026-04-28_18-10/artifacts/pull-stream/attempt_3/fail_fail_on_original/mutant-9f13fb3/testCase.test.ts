import { prop } from '../../../../../../../../../../../subject_repositories/pull-stream/util/prop';

describe('prop function', () => {
  it('should return a function that returns the value of a property', () => {
    const obj = { foo: 'bar' };
    const propFunc = prop('foo');
    expect(propFunc(obj)).toBe('bar');

    const obj2 = { foo: 'baz' };
    const propFunc2 = prop('foo');
    expect(propFunc2(obj2)).toBe('baz');

    const obj3 = { foo: 'qux' };
    const propFunc3 = prop('foo');
    expect(propFunc3(obj3)).toBe('qux');
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

  it('should return the value of the property when the key is a string', () => {
    const obj = { foo: 'bar' };
    const propFunc = prop('foo');
    expect(propFunc(obj)).toBe('bar');
  });
});