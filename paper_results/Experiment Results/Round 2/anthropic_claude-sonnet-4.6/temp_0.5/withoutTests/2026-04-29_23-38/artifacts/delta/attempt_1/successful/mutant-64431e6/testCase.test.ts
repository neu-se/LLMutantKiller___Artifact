import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap.ts"

describe('AttributeMap.diff', () => {
  it('should handle non-object b by treating it as empty object', () => {
    const a = { bold: true };
    const result = AttributeMap.diff(a, 'not-an-object' as any);
    // Original: b reset to {}, so bold key differs (true vs undefined -> null)
    // Mutated: b stays as string, different behavior
    expect(result).toEqual({ bold: null });
  });
});