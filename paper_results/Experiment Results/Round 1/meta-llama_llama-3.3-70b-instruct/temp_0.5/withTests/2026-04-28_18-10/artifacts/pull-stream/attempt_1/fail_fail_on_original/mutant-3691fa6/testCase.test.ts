import { prop } from '../../../util/prop';

describe('prop function', () => {
  it('should return a function that returns the value of the property when key is a string', () => {
    const obj = { foo: 'bar' };
    const propFunc = prop('foo');
    expect(propFunc(obj)).toBe('bar');
  });

  it('should return a function that returns the first match when key is a regexp', () => {
    const obj = 'hello world';
    const propFunc = prop(/world/);
    expect(propFunc(obj)).toBe('world');
  });

  it('should return the key itself when key is not a string or regexp', () => {
    const obj = {};
    const key = {};
    const propFunc = prop(key);
    expect(propFunc(obj)).toBe(key);
  });

  it('should pass when run against the original code', () => {
    const obj = { foo: 'bar' };
    const propFunc = prop('foo');
    expect(propFunc(obj)).toBe('bar');
  });

  it('should fail when run against the mutated code', () => {
    const obj = { foo: 'bar' };
    const key = {};
    const propFunc = prop(key);
    expect(propFunc(obj)).not.toBe(key);
  });
});