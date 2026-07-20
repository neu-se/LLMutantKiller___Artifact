import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap.ts";

describe('AttributeMap.diff', () => {
  it('should return the difference when b has a key with a value different from a', () => {
    // a is a valid object, so the if(typeof a !== 'object') block should NOT execute
    // Original: b = { italic: true } is preserved, diff returns { italic: true }
    // Mutated: b = {} always runs, so b becomes {}, diff returns { bold: null } (a.bold not in b)
    const a = { bold: true };
    const b = { italic: true };
    const result = AttributeMap.diff(a, b);
    expect(result).toEqual({ bold: null, italic: true });
  });
});