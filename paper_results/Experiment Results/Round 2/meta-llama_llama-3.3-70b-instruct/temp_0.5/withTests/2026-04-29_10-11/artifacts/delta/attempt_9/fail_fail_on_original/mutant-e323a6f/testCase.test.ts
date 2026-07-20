import AttributeMap from '../../../../../../../../../../../subject_repositories/delta/src/AttributeMap';

describe('AttributeMap', () => {
  it('transform function should return undefined when attributes has no keys and priority is false', () => {
    const a: AttributeMap = {};
    const b: AttributeMap = {};
    const result = AttributeMap.transform(a, b, false);
    expect(result).toBeUndefined();
    const c: AttributeMap = { a: 1 };
    const d: AttributeMap = {};
    const result2 = AttributeMap.transform(c, d, false);
    expect(result2).not.toBeUndefined();
  });
});