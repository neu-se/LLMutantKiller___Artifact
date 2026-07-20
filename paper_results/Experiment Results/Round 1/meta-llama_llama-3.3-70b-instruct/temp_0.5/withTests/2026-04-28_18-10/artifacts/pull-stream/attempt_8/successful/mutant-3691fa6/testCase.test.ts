import prop from '../../../../../../../../../../../subject_repositories/pull-stream/util/prop';

describe('prop function', () => {
  it('should return a function that returns the value of the property when key is a string and return key when key is an object that is not a regexp', () => {
    const obj = { foo: 'bar' };
    const propFunc = prop('foo');
    expect(propFunc(obj)).toBe('bar');

    const obj2 = { foo: 'bar' };
    const key = {};
    const propFunc2 = prop(key);
    expect(propFunc2).toBe(key);

    const obj3 = { foo: 'bar' };
    const key2 = /foo/;
    const propFunc3 = prop(key2);
    expect(typeof propFunc3).toBe('function');
  });
});