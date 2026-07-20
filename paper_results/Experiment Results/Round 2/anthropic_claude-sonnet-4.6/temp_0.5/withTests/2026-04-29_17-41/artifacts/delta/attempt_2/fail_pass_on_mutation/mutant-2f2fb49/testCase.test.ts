import AttributeMap from "../../../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap.compose()', () => {
  it('preserves a attributes when b is undefined with keepNull true', () => {
    // Original: typeof undefined !== 'object', so b = {}
    //   attributes = cloneDeep({}) = {}
    //   keepNull=true skips the null-filtering reduce
    //   for (key in a): a['bold'] !== undefined && b['bold'] === undefined -> attributes['bold'] = true
    //   returns { bold: true }
    // Mutated: typeof undefined !== 'object', but b stays undefined (no assignment)
    //   attributes = cloneDeep(undefined) = undefined
    //   keepNull=true skips reduce
    //   for (key in a): b[key] where b=undefined throws TypeError
    const a = { bold: true };
    expect(AttributeMap.compose(a, undefined, true)).toEqual({ bold: true });
  });
});