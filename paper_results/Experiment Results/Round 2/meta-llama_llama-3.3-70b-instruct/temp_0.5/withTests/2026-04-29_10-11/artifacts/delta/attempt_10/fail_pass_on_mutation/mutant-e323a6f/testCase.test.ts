import AttributeMap from '../../../../../../../../../../../subject_repositories/delta/src/AttributeMap';

describe('AttributeMap', () => {
  it('transform function should return an object with length 0 when attributes is empty and priority is false in the original code, but not in the mutated code', () => {
    const a: AttributeMap = {};
    const b: AttributeMap = {};
    const result = AttributeMap.transform(a, b, false);
    expect(Object.keys(result).length).toBe(0);
    const c: AttributeMap = { a: null };
    const d: AttributeMap = {};
    const result2 = AttributeMap.transform(c, d, false);
    expect(Object.keys(result2).length).toBe(0);
  });
});