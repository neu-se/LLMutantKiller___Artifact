import AttributeMap from "../../../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap.compose()', () => {
  it('compose with string b and keepNull=false should not include string character keys', () => {
    // b = 'ab' (primitive string): typeof 'ab' === 'string', not 'object'
    // Original: b = {}, cloneDeep({}) = {}, reduce -> {}, a keys added -> { bold: true }
    // Mutated: b stays 'ab', cloneDeep('ab') = 'ab' (primitive)
    //   reduce: Object.keys('ab') = ['0','1']
    //   'ab'[0]='a' != null -> copy['0']='a'; 'ab'[1]='b' != null -> copy['1']='b'
    //   attributes = {'0':'a', '1':'b'}
    //   for key 'bold' in a: b['bold']=undefined -> attributes['bold']=true
    //   returns {'0':'a','1':'b','bold':true} != {bold:true}
    const a = { bold: true };
    const b = 'ab' as unknown as undefined;
    expect(AttributeMap.compose(a, b)).toEqual({ bold: true });
  });
});