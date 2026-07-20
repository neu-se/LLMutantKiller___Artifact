import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap.diff', () => {
  it('handles non-object b by treating it as empty object', () => {
    // When b is not an object, original code reassigns b = {}
    // Mutated code has if(false) so b stays as the non-object value
    // With original: b becomes {}, so diff({bold: true}, {}) => {bold: null}
    // With mutated: b stays as string, Object.keys on string gives char indices
    const a = { bold: true };
    const result = AttributeMap.diff(a, 'notanobject' as any);
    expect(result).toEqual({ bold: null });
  });
});