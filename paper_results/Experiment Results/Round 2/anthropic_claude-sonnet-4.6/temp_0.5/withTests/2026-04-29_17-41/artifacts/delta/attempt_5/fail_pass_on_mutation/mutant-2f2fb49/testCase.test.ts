import AttributeMap from "../../../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap.compose()', () => {
  it('with non-object b as number, compose returns a attributes without b interference', () => {
    // b = 42: typeof 42 === 'number', not 'object'
    // Original: b = {}, cloneDeep({}) = {}, reduce removes nulls -> {}
    //   for (key in a): b[key] === undefined -> adds a keys -> { bold: true }
    //   returns { bold: true }
    // Mutated: b stays 42, cloneDeep(42) = 42
    //   reduce: Object.keys(42) = [] -> attributes stays 42 (no, reduce returns {})
    //   Wait: reduce<AttributeMap>((copy, key) => ..., {}) with no keys -> returns {}
    //   for (key in a): b[key] where b=42, 42['bold'] === undefined -> attributes['bold'] = true
    //   Object.keys({bold:true}) -> returns { bold: true }
    // Hmm, same result...
    // Let's try b with enumerable keys like an array
    const a = { bold: true };
    const bArr = [1, 2, 3] as unknown as undefined;
    // typeof [] === 'object', so this won't trigger the branch
    // Need a value where typeof !== 'object' AND has own enumerable properties
    // Strings have indexed properties!
    // b = 'hi': Object.keys('hi') = ['0', '1']
    // keepNull=false: reduce iterates ['0','1'], 'hi'[0]='h' != null -> copy['0']='h', copy['1']='i'
    // for (key in a): b['bold'] === undefined -> attributes['bold'] = true
    // Object.keys({0:'h',1:'i',bold:true}) -> returns that object, NOT { bold: true }
    const b = 'hi' as unknown as undefined;
    expect(AttributeMap.compose(a, b)).toEqual({ bold: true });
  });
});