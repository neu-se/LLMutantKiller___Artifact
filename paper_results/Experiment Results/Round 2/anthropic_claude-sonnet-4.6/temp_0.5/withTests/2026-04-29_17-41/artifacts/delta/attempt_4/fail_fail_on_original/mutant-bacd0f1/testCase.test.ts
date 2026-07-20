import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform()', () => {
  it('retain + retain where other retain is null-valued object uses length not null', () => {
    const a = new Delta().retain(1);
    // Force retain: null - bypassing the retain() method filter
    const b = new Delta([{ retain: null as any, attributes: { bold: true } }]);
    // otherData = null
    // Original: typeof null === 'object' && null !== null = false → transformedData = length = 1
    //   delta.retain(1, {bold:true}) → [{retain:1, attributes:{bold:true}}]
    // Mutated: typeof null === 'object' || null !== null = true → transformedData = null
    //   delta.retain(null, {bold:true}) → [{retain: null, attributes:{bold:true}}] (not chopped, null is not a number)
    const result = a.transform(b, false);
    expect(result.ops).toEqual([{ retain: 1, attributes: { bold: true } }]);
  });
});