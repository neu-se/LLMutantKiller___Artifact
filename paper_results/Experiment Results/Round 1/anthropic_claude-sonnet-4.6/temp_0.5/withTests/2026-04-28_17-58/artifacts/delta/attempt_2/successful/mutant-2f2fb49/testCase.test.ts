import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap.compose()', () => {
  it('should treat non-object b as empty object, preserving a attributes', () => {
    // When b is not an object, the original code sets b = {} so that
    // the loop `for (const key in a)` can copy a's attributes into the result.
    // The mutated code skips the assignment `b = {}`, leaving b as a non-object,
    // which causes the compose to behave incorrectly.
    const a = { bold: true, color: 'red' };
    // Pass a non-object as b (e.g., a string)
    const result = AttributeMap.compose(a, 'not-an-object' as any);
    // With the original code: b becomes {}, so attributes from a are preserved
    expect(result).toEqual({ bold: true, color: 'red' });
  });
});