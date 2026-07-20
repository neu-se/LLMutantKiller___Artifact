import { prop } from "../../../../../../../../subject_repositories/pull-stream/util/prop";

describe('prop function', () => {
  it('should return a function that returns the value of the given key', () => {
    const obj = { a: 1, b: 2 };
    const result = prop('a')(obj);
    expect(result).toBe(1);
  });

  it('should return undefined if the key does not exist in the object', () => {
    const obj = { a: 1, b: 2 };
    const result = prop('c')(obj);
    expect(result).toBeUndefined();
  });

  it('should return the original value if it is not an object', () => {
    const value = 'hello';
    const result = prop('a')(value);
    expect(result).toBe(value);
  });

  it('should return a function that returns the first match of the given regexp', () => {
    const obj = 'hello world';
    const result = prop(/hello/)(obj);
    expect(result).toBe('hello');
  });
});