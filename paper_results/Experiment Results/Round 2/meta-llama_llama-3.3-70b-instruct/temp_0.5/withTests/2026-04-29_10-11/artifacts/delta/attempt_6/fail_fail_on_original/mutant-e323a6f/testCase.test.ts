import AttributeMap from '../../../../../../../../../../../subject_repositories/delta/src/AttributeMap';

describe('AttributeMap', () => {
  it('transform function should return undefined when attributes has no keys', () => {
    const a: AttributeMap = {};
    const b: AttributeMap = {};
    const result = AttributeMap.transform(a, b, false);
    expect(result).toBeUndefined();
  });
});