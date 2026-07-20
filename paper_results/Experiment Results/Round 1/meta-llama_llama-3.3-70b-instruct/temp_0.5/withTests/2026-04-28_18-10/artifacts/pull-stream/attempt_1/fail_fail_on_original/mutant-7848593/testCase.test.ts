import { prop } from '../../../../../../../../subject_repositories/pull-stream/util/prop';

describe('prop function', () => {
  it('should return a function that extracts a property from an object', () => {
    const obj = { foo: 'bar' };
    const extractFoo = prop('foo');
    expect(extractFoo(obj)).toBe('bar');
  });

  it('should return a function that extracts a property from an object using a regexp', () => {
    const obj = { foo: 'bar' };
    const extractFoo = prop(/foo/);
    expect(extractFoo(obj)).toBe('bar');
  });

  it('should return the key itself if it is not a string or a regexp', () => {
    const key = { foo: 'bar' };
    const extractKey = prop(key);
    expect(extractKey({})).toBe(key);
  });
});