import { prop } from '../../../util/prop';

describe('prop function', () => {
  it('should return a function that extracts the specified property from an object', () => {
    const obj = { foo: 'bar', baz: 'qux' };
    const propFoo = prop('foo');
    expect(propFoo(obj)).toBe('bar');
    const regex = /bar/;
    const propRegex = prop(regex);
    expect(propRegex('bar baz')).toBe('bar');
    expect(propRegex('qux foo')).toBe('foo');
  });

  it('should return undefined if the property does not exist or the regex does not match', () => {
    const obj = { foo: 'bar', baz: 'qux' };
    const propQuux = prop('quux');
    expect(propQuux(obj)).toBeUndefined();
    const regex = /quux/;
    const propRegex = prop(regex);
    expect(propRegex('bar baz')).toBeUndefined();
  });

  it('should behave differently for the mutated code', () => {
    const obj = { foo: 'bar', baz: 'qux' };
    const regex = /quux/;
    const propRegex = prop(regex);
    expect(propRegex('bar baz')).toBeUndefined();
  });
});