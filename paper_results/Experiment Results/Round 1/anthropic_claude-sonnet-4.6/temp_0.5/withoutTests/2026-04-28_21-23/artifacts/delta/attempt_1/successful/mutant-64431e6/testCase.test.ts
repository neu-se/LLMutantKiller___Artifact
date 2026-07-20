import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap.ts";

describe('AttributeMap.diff', () => {
  it('should handle non-object b parameter by normalizing to empty object', () => {
    const a: AttributeMap = { bold: true };
    // With original code: b is set to {} when not an object, so diff returns {bold: null}
    // With mutated code: b stays as non-object, causing different behavior
    const result = AttributeMap.diff(a, 'string' as any);
    expect(result).toEqual({ bold: null });
  });
});