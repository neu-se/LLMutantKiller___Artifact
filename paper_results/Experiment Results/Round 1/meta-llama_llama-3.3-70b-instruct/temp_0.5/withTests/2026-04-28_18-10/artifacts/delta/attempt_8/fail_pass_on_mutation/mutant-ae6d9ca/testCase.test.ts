import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap', () => {
  it('diff function handles non-object input correctly', () => {
    const a = {};
    const b = { key: 'value' };
    const result = AttributeMap.diff(a, b);
    expect(result).toEqual(b);
    const c = 'string';
    const d = { key2: 'value2' };
    const result2 = AttributeMap.diff({}, d);
    expect(result2).toEqual(d);
    expect(typeof c).toBe('string');
  });
});