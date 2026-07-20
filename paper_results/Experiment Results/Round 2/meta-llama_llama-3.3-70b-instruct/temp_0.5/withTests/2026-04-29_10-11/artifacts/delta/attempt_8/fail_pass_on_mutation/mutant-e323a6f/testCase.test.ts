import AttributeMap from '../../../../../../../../../../../subject_repositories/delta/src/AttributeMap';

describe('AttributeMap', () => {
  it('transform function should return undefined when attributes is empty and has no keys', () => {
    const a: AttributeMap = { a: null };
    const b: AttributeMap = {};
    const result = AttributeMap.transform(a, b, false);
    expect(Object.keys(result)).not.toHaveLength(1);
  });
});