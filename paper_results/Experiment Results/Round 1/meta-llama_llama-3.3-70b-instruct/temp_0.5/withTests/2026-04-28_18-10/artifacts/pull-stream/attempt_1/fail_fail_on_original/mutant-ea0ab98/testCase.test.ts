import { prop } from '../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js';

describe('prop function', () => {
  it('should return a function that extracts a property from an object when given a string key', () => {
    const data = { foo: 'bar' };
    const propFunction = prop('foo');
    expect(propFunction(data)).toBe('bar');
  });

  it('should return a function that extracts a match from a string when given a RegExp key', () => {
    const data = 'hello world';
    const propFunction = prop(/world/);
    expect(propFunction(data)).toBe('world');
  });

  it('should return the key itself when given a non-string and non-RegExp key', () => {
    const data = 'hello world';
    const propFunction = prop(123);
    expect(propFunction(data)).toBe(123);
  });
});