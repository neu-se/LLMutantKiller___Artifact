import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap.diff', () => {
  it('should handle non-object b parameter by treating it as empty object', () => {
    const a = { key1: 'value1', key2: 'value2' };
    const b = null;
    const result = AttributeMap.diff(a, b as any);
    expect(result).toEqual({ key1: 'value1', key2: 'value2' });
  });
});