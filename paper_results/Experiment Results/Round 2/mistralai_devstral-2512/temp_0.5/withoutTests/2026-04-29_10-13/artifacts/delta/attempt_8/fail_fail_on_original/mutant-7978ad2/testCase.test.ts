import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap.diff', () => {
  it('should handle non-object b parameter by treating it as empty object', () => {
    const a = { key1: 'value1', key2: 'value2' };
    const b: any = "not an object";
    const result = AttributeMap.diff(a, b);
    // In the original code, non-object b is converted to {}
    // So all keys from a should appear in the diff with their original values
    expect(result).toEqual({ key1: 'value1', key2: 'value2' });
  });
});