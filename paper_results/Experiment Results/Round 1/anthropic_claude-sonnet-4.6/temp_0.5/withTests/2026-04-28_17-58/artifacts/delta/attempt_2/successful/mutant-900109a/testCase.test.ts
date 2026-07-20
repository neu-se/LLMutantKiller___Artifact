import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap.compose() with non-object first argument', () => {
  it('should treat a non-object first argument as empty object and return only b attributes', () => {
    // The original code checks `if (typeof a !== 'object')` and resets a to {}
    // The mutated code uses `if (false)` so it never resets a to {},
    // meaning when a is a non-object, the for...in loop over a may behave unexpectedly
    // or the function may throw/return wrong results.
    const b = { bold: true, color: 'red' };
    // Pass a non-object as `a` - original code converts it to {}, mutated code does not
    const result = AttributeMap.compose('not-an-object' as unknown as AttributeMap, b);
    // With original code: a becomes {}, so result is just b's attributes
    expect(result).toEqual({ bold: true, color: 'red' });
  });
});