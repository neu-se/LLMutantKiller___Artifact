import { prop } from '../../util/prop.js';

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

  it('should return a function that returns undefined when given a RegExp key with no match', () => {
    const data = 'hello world';
    const propFunction = prop(/foo/);
    expect(propFunction(data)).toBeUndefined();
  });

  it('should fail when given a RegExp key and an empty function is returned', () => {
    const data = 'hello world';
    const propFunction = prop(/world/);
    const mutatedPropFunction = () => {};
    expect(mutatedPropFunction(data)).not.toBe('world');
  });
});