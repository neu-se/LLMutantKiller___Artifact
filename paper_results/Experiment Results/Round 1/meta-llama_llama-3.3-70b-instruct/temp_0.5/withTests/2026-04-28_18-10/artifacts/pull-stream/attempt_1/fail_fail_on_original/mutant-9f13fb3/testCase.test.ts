import { prop } from '../../../../../../../../subject_repositories/pull-stream/util/prop';

describe('prop function', () => {
  it('should return a function that returns the value of a property', () => {
    const obj = { foo: 'bar' };
    const propFunc = prop('foo');
    expect(propFunc(obj)).toBe('bar');
  });

  it('should return the key when the key is not a string', () => {
    const key = 123;
    const propFunc = prop(key);
    expect(propFunc({})).toBe(key);
  });

  it('should return a function that returns the first match when the key is a regexp', () => {
    const key = /bar/;
    const propFunc = prop(key);
    const str = 'foobar';
    const match = key.exec(str);
    expect(propFunc(str)).toBe(match && match[0]);
  });
});