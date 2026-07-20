import { prop } from '../../../util/prop';

describe('prop function', () => {
  it('should return a function that extracts the specified property from an object', () => {
    const obj = { foo: 'bar', baz: 'qux' };
    const propFoo = prop('foo');
    expect(propFoo(obj)).toBe('bar');
  });

  it('should return the first match if the key is a RegExp', () => {
    const obj = 'hello world';
    const key = /hello/;
    const propHello = prop(key);
    expect(propHello(obj)).toBe('hello');
  });

  it('should return undefined if the key is a RegExp and does not match', () => {
    const obj = 'hello world';
    const key = /goodbye/;
    const propGoodbye = prop(key);
    expect(propGoodbye(obj)).toBeUndefined();
  });

  it('should return null if the key is a RegExp and the object is null in the mutated code', () => {
    const obj = null;
    const key = /hello/;
    const propHello = prop(key);
    // This test should fail for the original code
    expect(propHello(obj)).not.toBeUndefined();
  });
});