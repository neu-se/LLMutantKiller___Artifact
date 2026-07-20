import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap.ts";

describe('AttributeMap.diff with non-object b', () => {
  it('should treat non-object b as empty object', () => {
    const a = { bold: true };
    // When b is not an object (e.g., null treated as non-object via typeof check),
    // original code reassigns b = {}, so diff(a, null-like) should return { bold: null }
    // The mutation changes the reassignment guard to if(false), so b stays non-object
    const result = AttributeMap.diff({ bold: true }, undefined);
    expect(result).toEqual({ bold: null });
  });
});