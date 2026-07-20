import "../../../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";
import AttributeMap from "../../../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap.compose()', () => {
  it('with keepNull=true and non-object b, returns only a attributes', () => {
    // Original: b = {} when non-object, so cloneDeep({}) = {}
    //   keepNull=true skips reduce
    //   for (key in a): b[key] === undefined, so attributes[key] = a[key]
    //   Object.keys({bold:true}) = ['bold'], returns { bold: true }
    //
    // Mutated: b stays as 'x' (string), cloneDeep('x') = 'x'
    //   keepNull=true skips reduce
    //   for (key in a): 'x'['bold'] === undefined, so attributes['bold'] = true
    //     but attributes is a String primitive wrapper... assignment is lost
    //   Object.keys('x') = ['0'] (character indices only)
    //   result: { '0': 'x' } which has length > 0, so returns { '0': 'x' }
    //   NOT equal to { bold: true }
    const a = { bold: true };
    const b = 'x' as unknown as undefined;
    expect(AttributeMap.compose(a, b, true)).toEqual({ bold: true });
  });
});