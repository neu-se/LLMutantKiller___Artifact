import { prop } from '../../../../../../../../subject_repositories/pull-stream/util/prop';

describe('prop function', () => {
  it('should return a function that extracts the specified property from an object', () => {
    const obj = { foo: 'bar', baz: 'qux' };
    const propFoo = prop('foo');
    expect(propFoo(obj)).toBe('bar');
  });

  it('should return a function that returns undefined if the property does not exist', () => {
    const obj = { foo: 'bar', baz: 'qux' };
    const propQuux = prop('quux');
    expect(propQuux(obj)).toBeUndefined();
  });

  it('should return a function that returns the match if the key is a RegExp', () => {
    const obj = 'hello world';
    const key = /hello/;
    const propHello = prop(key);
    expect(propHello(obj)).toBe('hello');
  });

  it('should return the key itself if it is not a string or RegExp', () => {
    const obj = { foo: 'bar', baz: 'qux' };
    const key = 42;
    const prop42 = prop(key);
    expect(prop42(obj)).toBe(42);
  });

  it('should return undefined if the key is a RegExp and does not match', () => {
    const obj = 'hello world';
    const key = /goodbye/;
    const propGoodbye = prop(key);
    expect(propGoodbye(obj)).toBeUndefined();
  });

  it('should return the match if the key is a RegExp and matches', () => {
    const obj = 'hello world';
    const key = /hello/;
    const propHello = prop(key);
    expect(propHello(obj)).toBe('hello');
  });

  it('should return the first match if the key is a RegExp and matches multiple times', () => {
    const obj = 'hello world hello again';
    const key = /hello/;
    const propHello = prop(key);
    expect(propHello(obj)).toBe('hello');
  });
});