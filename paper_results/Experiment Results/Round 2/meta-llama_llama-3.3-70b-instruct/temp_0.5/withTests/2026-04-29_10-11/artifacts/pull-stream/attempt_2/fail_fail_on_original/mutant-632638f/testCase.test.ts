import { prop } from '../../../util/prop';

describe('prop function', () => {
  it('should return a function that retrieves the value of a property from an object', () => {
    const obj = { foo: 'bar' };
    const propFoo = prop('foo');
    expect(propFoo(obj)).toBe('bar');
  });

  it('should return undefined when the property does not exist', () => {
    const obj = { foo: 'bar' };
    const propBaz = prop('baz');
    expect(propBaz(obj)).toBeUndefined();
  });

  it('should return the original value when the key is not a string', () => {
    const obj = { foo: 'bar' };
    const propFoo = prop(obj);
    expect(propFoo).toBe(obj);
  });

  it('should return the result of the exec function when the key is a RegExp', () => {
    const obj = 'hello world';
    const propHello = prop(/hello/);
    expect(propHello(obj)).toBe('hello');
  });

  it('should return the value of the property when the key is a string', () => {
    const obj = { foo: 'bar' };
    const propFoo = prop('foo');
    expect(propFoo(obj)).toBe('bar');
  });
});