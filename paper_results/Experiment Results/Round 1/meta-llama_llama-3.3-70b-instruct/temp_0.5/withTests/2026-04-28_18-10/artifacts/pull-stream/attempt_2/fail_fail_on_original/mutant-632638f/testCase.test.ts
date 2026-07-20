import { prop } from "../../../../../../../../subject_repositories/pull-stream/util/prop";

describe('prop function', () => {
  it('should return a function that returns the value of the given key', () => {
    const obj = { a: 1, b: 2 };
    const func = prop('a');
    expect(func(obj)).toBe(1);
  });

  it('should return undefined if the key does not exist in the object', () => {
    const obj = { a: 1, b: 2 };
    const func = prop('c');
    expect(func(obj)).toBeUndefined();
  });

  it('should return the original value if it is not an object', () => {
    const value = 'hello';
    const func = prop('a');
    expect(func(value)).toBe(value);
  });

  it('should return the first match of the given regexp', () => {
    const obj = 'hello world';
    const func = prop(/hello/);
    expect(func(obj)).toBe('hello');
  });

  it('should not return undefined when the key is valid and the function is called', () => {
    const obj = { a: 1, b: 2 };
    const func = prop('a');
    expect(func(obj)).not.toBeUndefined();
  });
});