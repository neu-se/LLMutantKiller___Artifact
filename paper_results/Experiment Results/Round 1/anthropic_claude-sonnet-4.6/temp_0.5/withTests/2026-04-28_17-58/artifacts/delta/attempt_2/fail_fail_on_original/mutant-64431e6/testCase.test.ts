import AttributeMap from "../src/AttributeMap";

describe('AttributeMap.diff', () => {
  it('handles non-object b by treating it as empty object', () => {
    // When b is not an object, original reassigns b = {}
    // Mutated code skips reassignment (if(false)), so b stays as string
    // Original: diff({bold: true}, "string") => b becomes {} => result is {bold: null}
    // Mutated: b stays as "string", Object.keys("string") iterates char indices, producing different result
    const a = { bold: true };
    const result = AttributeMap.diff(a, 'notanobject' as any);
    expect(result).toEqual({ bold: null });
  });
});