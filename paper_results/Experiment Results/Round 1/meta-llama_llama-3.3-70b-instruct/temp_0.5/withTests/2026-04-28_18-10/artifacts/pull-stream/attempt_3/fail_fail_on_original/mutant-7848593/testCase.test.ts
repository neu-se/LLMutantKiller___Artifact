import { prop } from '../../../../../../../../subject_repositories/pull-stream/util/prop';

describe('prop function', () => {
  it('should correctly handle the case where key is a regexp', () => {
    const obj = { foo: 'bar' };
    const key = /foo/;
    const extractProp = prop(key);
    expect(extractProp(obj)).toBe('bar');
  });

  it('should correctly handle the case where key is an object with a function exec property', () => {
    const obj = { foo: 'bar' };
    const key = { exec: () => null };
    const extractProp = prop(key);
    expect(extractProp(obj)).toBeUndefined();
  });

  it('should throw an error when key is an object with a non-function exec property in the original code', () => {
    const obj = { foo: 'bar' };
    const key = { exec: "" };
    const extractProp = prop(key);
    expect(() => extractProp(obj)).toThrow(); // This should fail on the mutated code
  });
});