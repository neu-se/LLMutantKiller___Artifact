import { prop } from '../../../../../../../../subject_repositories/pull-stream/util/prop.js';
import { test, expect } from '@jest/globals';

describe('prop function', () => {
  it('should return the correct value when key is a string', () => {
    const data = { foo: 'bar' };
    const key = 'foo';
    const result = prop(key)(data);
    expect(result).toBe('bar');
  });

  it('should return the correct value when key is a regular expression', () => {
    const data = 'hello world';
    const key = /hello/;
    const result = prop(key)(data);
    expect(result).toBe('hello');
  });

  it('should return undefined when key is not found in data', () => {
    const data = { foo: 'bar' };
    const key = 'baz';
    const result = prop(key)(data);
    expect(result).toBeUndefined();
  });

  it('should return the correct value when key is an object with exec method', () => {
    const data = 'hello world';
    const key = /hello/;
    const result = prop(key)(data);
    expect(result).toBe('hello');
  });

  it('should fail when mutated code is used', () => {
    const data = 'hello world';
    const key = /hello/;
    const mutatedProp = function (key) {
      return key && (
        'string' == typeof key
        ? function (data) { return data[key] }
        : 'object' === typeof key && 'function' === typeof key.exec //regexp
          ? function (data) { var v = key.exec(data); return v || v[0] }
        : key
      )
    };
    expect(() => mutatedProp(key)(data)).toThrowError();
  });
});