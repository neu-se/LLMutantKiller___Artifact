import AttributeMap from "../../../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap.compose()', () => {
  it('compose with non-object b (number) and overlapping key in b', () => {
    // Use a number as b, but the key difference:
    // in the for loop: `b[key] === undefined` uses the ORIGINAL b, not attributes
    // Original: b reset to {}, so b['bold'] === undefined -> a keys added
    // Mutated: b stays as number 42, b['bold'] === undefined -> a keys still added
    // Both return { bold: true }... same.
    //
    // The REAL difference: what if b has a key that matches a key in a?
    // We need b[key] !== undefined for some key in a.
    // With string b = 'bold' (length 4): b['bold'] is undefined (not a numeric index)
    // With object-like... we need typeof b !== 'object' but b[someKey] !== undefined
    // A function! typeof function === 'function', and functions can have properties.
    const a = { bold: true };
    const bFunc = function() {} as unknown as undefined;
    (bFunc as any).bold = 'fromB';
    expect(AttributeMap.compose(a, bFunc)).toEqual({ bold: true });
  });
});