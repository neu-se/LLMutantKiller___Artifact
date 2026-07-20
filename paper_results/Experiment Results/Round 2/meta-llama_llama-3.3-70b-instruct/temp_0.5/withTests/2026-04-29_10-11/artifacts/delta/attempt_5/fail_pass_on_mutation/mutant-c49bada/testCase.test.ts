import AttributeMap from '../../../../../../../../../../../subject_repositories/delta/src/AttributeMap';

describe('AttributeMap compose function', () => {
  it('should return the correct result when both arguments are empty objects', () => {
    expect(AttributeMap.compose({}, {})).toBeUndefined();
  });
});