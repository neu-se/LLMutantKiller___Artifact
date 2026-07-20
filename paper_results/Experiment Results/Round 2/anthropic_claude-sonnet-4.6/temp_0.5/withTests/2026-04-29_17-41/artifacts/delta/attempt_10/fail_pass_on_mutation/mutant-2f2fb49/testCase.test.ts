import AttributeMap from "../../../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap.compose()', () => {
  it('compose with non-object b having a key that conflicts with a key in a', () => {
    // The mutation only matters if b has a property that would override a's property
    // in the for loop: `if (a[key] !== undefined && b[key] === undefined)`
    // If b[key] !== undefined, a[key] won't be added to attributes
    // Original: b={}, b['bold']===undefined -> bold from a IS added
    // Mutated: if b has 'bold' property, b['bold'] !== undefined -> bold from a NOT added
    // We need typeof b !== 'object' but b.bold !== undefined
    // A function with a 'bold' property fits: typeof function === 'function'
    // cloneDeep of a function returns {} in lodash
    // So attributes = {}, then for 'bold' in a: b['bold'] !== undefined (b is still the function)
    // -> bold NOT added to attributes -> returns undefined!
    const fn = function() {} as unknown as undefined;
    (fn as any).bold = 'yes';
    const a = { bold: true };
    expect(AttributeMap.compose(a, fn)).toEqual({ bold: true });
  });
});