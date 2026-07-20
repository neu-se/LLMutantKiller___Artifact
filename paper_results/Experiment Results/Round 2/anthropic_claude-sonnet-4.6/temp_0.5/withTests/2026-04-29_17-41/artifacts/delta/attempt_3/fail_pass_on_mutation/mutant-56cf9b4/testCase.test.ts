import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('invert()', () => {
  it('retain with attributes inverts correctly using base op attributes', () => {
    // A retain with attributes where op.retain is truthy but op.attributes is falsy
    // cannot happen in normal flow. But we can test that retain+attributes still works
    // and that the round-trip holds, which would break if extra retains were added.
    // 
    // Key insight: retain(n, attrs) enters the forEach. Original: else if (op.retain && op.attributes) fires.
    // Mutation: else if (true) fires. Both fire! So same result for retain WITH attributes.
    //
    // The real difference: when does op.retain exist but op.attributes is null/undefined
    // AND we're in the forEach branch? That requires op.delete to be set (since plain retain
    // with no attrs returns early). So op.delete is set - forEach runs insert. Then else-if:
    // original: op.retain && op.attributes = false (op.retain is undefined for delete op).
    // mutation: true - so retain is ALSO called after insert!
    
    const delta = new Delta().delete(2);
    const base = new Delta().insert('ab', { bold: true });
    
    // With mutation: forEach calls insert(baseOp) AND retain(1, AttributeMap.invert(undefined, {bold:true}))
    // That means inverted gets both insert and retain ops - wrong!
    const inverted = delta.invert(base);
    const expected = new Delta().insert('ab', { bold: true });
    
    expect(inverted).toEqual(expected);
  });
});