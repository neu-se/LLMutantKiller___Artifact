import prop from '../../../../../../../../../../../subject_repositories/pull-stream/util/prop';

describe('prop function', () => {
  it('should return a function that returns the value of the property when key is a string and fail when key is an object', () => {
    const obj = { foo: 'bar' };
    const propFunc = prop('foo');
    expect(propFunc(obj)).toBe('bar');

    const obj2 = { foo: 'bar' };
    const key = {};
    const propFunc2 = prop(key);
    expect(typeof propFunc2).toBe('function');
    expect(propFunc2(obj2)).not.toBe(key);
  });
});