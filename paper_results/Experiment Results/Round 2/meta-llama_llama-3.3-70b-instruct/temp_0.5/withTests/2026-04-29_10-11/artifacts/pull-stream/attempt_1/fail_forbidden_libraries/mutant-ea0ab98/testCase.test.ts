import { prop } from '../../../../../../../../subject_repositories/pull-stream/util/prop.js';
import { test, expect } from '@jest/globals';

describe('prop function', () => {
  it('should return a function that extracts a property from an object', () => {
    const data = { name: 'John', age: 30 };
    const propName = 'name';
    const extractor = prop(propName);
    expect(extractor(data)).toBe('John');
  });

  it('should return a function that extracts a match from a string using a regexp', () => {
    const data = 'Hello, world!';
    const regexp = /world/;
    const extractor = prop(regexp);
    expect(extractor(data)).toBe('world');
  });

  it('should return the key itself if it is not a string or a regexp', () => {
    const key = 123;
    const extractor = prop(key);
    expect(extractor({})).toBe(key);
  });
});