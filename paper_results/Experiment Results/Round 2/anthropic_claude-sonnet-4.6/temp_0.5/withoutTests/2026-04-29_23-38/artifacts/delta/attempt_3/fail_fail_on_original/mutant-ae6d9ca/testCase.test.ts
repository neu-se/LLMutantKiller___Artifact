import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap.ts";

describe('AttributeMap.diff', () => {
  it('should return undefined when a is non-object and b has content', () => {
    // Original: a={}, b={} -> undefined
    // Mutated: a stays as non-object string, b={} -> Object.keys('hello') returns ['0','1','2','3','4']
    // a['0'] !== b['0'] -> attrs['0'] = null -> returns { '0': null, ... }
    const result = AttributeMap.diff('hello' as any, { bold: true });
    expect(result).toBeUndefined();
  });
});