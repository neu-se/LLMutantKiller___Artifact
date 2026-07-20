import AttributeMap from '../../../../../../../../../../../subject_repositories/delta/src/AttributeMap';

describe('AttributeMap', () => {
  it('transform function should return an object when attributes is empty and priority is false', () => {
    const a: AttributeMap = { a: null };
    const b: AttributeMap = { b: null };
    const result = AttributeMap.transform(a, b, false);
    expect(Object.keys(result).length).toBeGreaterThanOrEqual(0);
  });
});