import AttributeMap from "../../../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap.compose()', () => {
  it('compose where b is explicitly passed as a non-object non-null value with keepNull true', () => {
    // typeof null === 'object' so null won't trigger the branch
    // typeof undefined === 'undefined' but default param handles it
    // Let's use a boolean: typeof false === 'boolean'
    // Original: b = {}, cloneDeep({}) = {}, keepNull=true skips reduce
    //   for 'bold' in a: b['bold'] (b={}) === undefined -> attributes['bold'] = true
    //   returns { bold: true }
    // Mutated: b stays false, cloneDeep(false) = false
    //   keepNull=true skips reduce
    //   for 'bold' in a: b['bold'] (b=false) === undefined -> attributes['bold'] = true on false primitive
    //   Object.keys(false) = [] -> returns undefined
    const a = { bold: true };
    const b = false as unknown as undefined;
    expect(AttributeMap.compose(a, b, true)).toEqual({ bold: true });
  });
});