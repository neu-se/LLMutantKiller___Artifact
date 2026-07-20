import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap.ts"

describe('AttributeMap.compose', () => {
  it('should handle non-object b by treating it as empty object', () => {
    // When b is null (not an object), compose should handle it gracefully
    // Original code has handling for non-object b, mutated code skips it with if(false)
    const a = { bold: true };
    // With null as b, original handles it, mutation may throw or behave differently
    const result = AttributeMap.compose(a, null as any);
    // Should return a's attributes since b is treated as empty
    expect(result).toEqual({ bold: true });
  });
});