import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap.ts"

describe('AttributeMap.compose with non-object b', () => {
  it('should handle non-object b by treating it as empty object', () => {
    // When b is not an object (e.g., a string), the compose function should
    // handle it. In original code, the inner if(typeof b !== 'object') block
    // executes (since b is indeed not an object). In mutated code, if(false)
    // means the block is skipped, changing behavior.
    const a = { bold: true };
    // Pass null as b - null has typeof 'object' so won't trigger
    // Pass a string as b - typeof string !== 'object'
    const result = AttributeMap.compose(a, 'not-an-object' as any);
    // In original: inner if executes, in mutated: it doesn't
    // The behavior difference should be observable
    expect(result).toEqual({ bold: true });
  });
});