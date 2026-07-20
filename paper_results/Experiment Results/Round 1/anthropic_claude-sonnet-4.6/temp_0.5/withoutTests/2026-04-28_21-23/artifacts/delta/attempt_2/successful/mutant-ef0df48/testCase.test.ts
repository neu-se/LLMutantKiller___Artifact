import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap.compose', () => {
  it('should handle non-object b (like a string) gracefully', () => {
    const a = { bold: true };
    // typeof 'string' !== 'object', so the outer if triggers
    // Original handles it (sets b = {}), mutation skips with if(false)
    const result = AttributeMap.compose(a, 'not-an-object' as any);
    expect(result).toEqual({ bold: true });
  });
});