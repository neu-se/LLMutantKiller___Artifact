import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap.ts"

describe('AttributeMap.diff', () => {
  it('should correctly diff two attribute maps without resetting b when a is an object', () => {
    const a = { bold: true };
    const b = { bold: null };
    // In original: a is object, so the if block doesn't execute, b stays as { bold: null }
    // diff should return { bold: null } since b[key] is null (not undefined)
    // In mutated: b = {} always executes, so diff returns undefined (empty result)
    const result = AttributeMap.diff(a, b);
    expect(result).toEqual({ bold: null });
  });
});