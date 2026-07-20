import AttributeMap from '../../../../../../../../../../../subject_repositories/delta/src/AttributeMap';

describe('AttributeMap compose function', () => {
  it('should return the correct result when the first argument is an object and the second argument is an object', () => {
    expect(AttributeMap.compose({ a: 1 }, { b: 2 })).toEqual({ a: 1, b: 2 });
  });

  it('should return the correct result when the first argument is not an object and the second argument is an object', () => {
    expect(AttributeMap.compose('string', { b: 2 })).toEqual({ b: 2 });
  });
});