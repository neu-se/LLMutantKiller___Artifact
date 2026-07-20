import AttributeMap from "../../../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap.compose()', () => {
  it('compose with keepNull=true and b as non-object, b keys should not appear in result', () => {
    // With b = 'ab' (string) and keepNull = true:
    // Original: b = {}, cloneDeep({}) = {}, a keys added -> { bold: true }
    // Mutated: b stays 'ab', cloneDeep('ab') returns String object {'0':'a','1':'b'}
    //   keepNull=true skips reduce
    //   for key in a: b['bold'] === undefined -> attributes['bold'] = true
    //   Object.keys(StringObject) includes '0','1' AND 'bold'
    //   returns {'0':'a', '1':'b', bold:true} != {bold:true}
    const a = { bold: true };
    const b = new String('ab') as unknown as undefined;
    expect(AttributeMap.compose(a, b, true)).toEqual({ bold: true });
  });
});