import { prop } from '../../../../../../../../subject_repositories/pull-stream/util/prop';

describe('prop function', () => {
  it('should return the value of the property when key is a string', () => {
    const obj = { foo: 'bar' };
    const extractProp = prop('foo');
    expect(extractProp(obj)).toBe('bar');
  });

  it('should return the matched value when key is a regexp', () => {
    const obj = { foo: 'bar' };
    const extractProp = prop(/foo/);
    expect(extractProp(obj)).toBe('bar');
  });

  it('should return undefined when key is an object with a function exec property', () => {
    const obj = { foo: 'bar' };
    const key = { exec: () => null };
    const extractProp = prop(key);
    expect(extractProp(obj)).toBeUndefined();
  });

  it('should throw an error when key is an object and not a regexp in the original code', () => {
    const obj = { foo: 'bar' };
    const key = { exec: "" };
    const extractProp = prop(key);
    expect(() => extractProp(obj)).toThrow(); // This should pass on the original code and fail on the mutated code
  });
});