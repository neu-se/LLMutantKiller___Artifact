import { prop } from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";
import { jest } from '@jest/globals';

describe('prop function', () => {
  it('should return a function that returns the value of the given key when key is a string', () => {
    const data = { a: 1, b: 2 };
    const key = 'a';
    const result = prop(key)(data);
    expect(result).toBe(1);
  });

  it('should return a function that returns the value of the given key when key is a regular expression', () => {
    const data = 'hello world';
    const key = /hello/;
    const result = prop(key)(data);
    expect(result).toBe('hello');
  });

  it('should return the original value when key is not a string or a regular expression', () => {
    const data = { a: 1, b: 2 };
    const key = 1;
    const result = prop(key)(data);
    expect(result).toBe(1);
  });

  it('should pass when run against the original code', () => {
    const data = { a: 1, b: 2 };
    const key = 'a';
    const result = prop(key)(data);
    expect(result).toBe(1);
  });

  it('should fail when run against the mutated code', () => {
    const data = { a: 1, b: 2 };
    const key = { exec: () => {} };
    const result = prop(key)(data);
    expect(result).not.toBe(key);
  });
});