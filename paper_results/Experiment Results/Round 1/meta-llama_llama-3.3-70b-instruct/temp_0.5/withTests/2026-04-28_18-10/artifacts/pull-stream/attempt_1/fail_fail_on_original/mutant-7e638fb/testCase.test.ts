import { prop } from "../../../../../../../../subject_repositories/pull-stream/util/prop";

describe('prop', () => {
  it('should return a function that returns the value of the specified property', () => {
    const obj = { foo: 'bar', baz: 'qux' };
    const fooProp = prop('foo');
    expect(fooProp(obj)).toBe('bar');
  });

  it('should return a function that returns the value of the specified property when key is a string', () => {
    const obj = { foo: 'bar', baz: 'qux' };
    const fooProp = prop('foo');
    expect(fooProp(obj)).toBe('bar');
  });

  it('should return a function that returns the first match when key is a RegExp', () => {
    const obj = { foo: 'bar', baz: 'qux' };
    const fooProp = prop(/foo/);
    expect(fooProp(obj)).toBe('bar');
  });

  it('should return undefined when key is not a string or RegExp and does not have an exec method', () => {
    const obj = { foo: 'bar', baz: 'qux' };
    const fooProp = prop({});
    expect(fooProp(obj)).toBeUndefined();
  });
});