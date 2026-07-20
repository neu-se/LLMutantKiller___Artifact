import { prop } from '../../../util/prop';

describe('prop function', () => {
  it('should return a function that returns the value of a property when given an object', () => {
    const obj = { foo: 'bar' };
    const property = 'foo';
    const result = prop(property)(obj);
    expect(result).toBe('bar');
  });

  it('should return the original value when given a non-object and non-string', () => {
    const value = /test/;
    const result = prop(value)({ foo: 'bar' });
    expect(result).toBe(value);
  });

  it('should return the first match when given a regular expression', () => {
    const regex = /test/;
    const str = 'this is a test string';
    const result = prop(regex)(str);
    expect(result).toBe('test');
  });

  it('should return the original value when given an object without a exec property', () => {
    const obj = { foo: 'bar' };
    const result = prop(obj)({ foo: 'bar' });
    expect(result).toBe(obj);
  });
});