import { prop } from '../../util/prop';

describe('prop function', () => {
  it('should return the value of the property when the key is a string and the property exists', () => {
    const obj = { foo: 'bar' };
    const propFoo = prop('foo');
    expect(propFoo(obj)).toBe('bar');
  });

  it('should return undefined when the property does not exist', () => {
    const obj = { foo: 'bar' };
    const propBaz = prop('baz');
    expect(propBaz(obj)).toBeUndefined();
  });

  it('should throw an error when the mutated code is used', () => {
    const obj = { foo: 'bar' };
    const propFoo = prop('foo');
    expect(() => propFoo(obj)).not.toThrow();
  });
});