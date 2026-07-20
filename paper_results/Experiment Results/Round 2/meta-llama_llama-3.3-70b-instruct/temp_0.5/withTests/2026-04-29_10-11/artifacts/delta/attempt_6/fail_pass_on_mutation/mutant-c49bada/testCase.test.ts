import AttributeMap from '../../../../../../../../../../../subject_repositories/delta/src/AttributeMap';

describe('AttributeMap compose function', () => {
  it('should return the correct result when the first argument is null', () => {
    expect(AttributeMap.compose(null, { a: 1 })).toEqual({ a: 1 });
  });
});