import { prop } from "../../../../../../../../subject_repositories/pull-stream/util/prop";

describe('prop function', () => {
  it('should return a function that returns the specified property of an object when key is a string', () => {
    const obj = { foo: 'bar' };
    const result = prop('foo')(obj);
    expect(result).toBe('bar');
  });

  it('should return a function that returns the matched string when key is a RegExp', () => {
    const obj = 'hello world';
    const result = prop(/world/)(obj);
    expect(result).toBe('world');
  });

  it('should return the key itself when key is not a string or RegExp', () => {
    const obj = {};
    const key = {};
    const result = prop(key)(obj);
    expect(result).toBe(key);
  });
});