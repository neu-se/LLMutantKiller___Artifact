import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('invert()', () => {
  it('retain with attributes on multi-op base slice produces correct inversion', () => {
    // Base has two ops in the slice range
    // delta retains with attributes over a range covering multiple base ops
    // Original: else if (op.retain && op.attributes) fires for each baseOp
    // Mutation: else if (true) fires - same result when op.retain && op.attributes is truthy
    // BUT: what if op.attributes is falsy? Need retain in forEach with no attributes.
    // 
    // The early return: typeof op.retain === 'number' && op.attributes == null -> returns
    // So if op.attributes is null, we return early and never reach forEach.
    // If op.attributes is non-null object, op.retain && op.attributes is truthy -> same result.
    //
    // CONCLUSION: The only difference is retain with op.attributes being undefined
    // but NOT caught by == null... impossible since undefined == null is true.
    //
    // Let me try: what if op comes from raw ops array with retain but attributes: false?
    // That's not possible through normal API.
    //
    // Maybe the mutation affects when op.retain is 0? retain(0) returns early from retain().
    // Or when op.retain is falsy number?
    
    // Actually: re-reading the early return condition:
    // } else if (typeof op.retain === 'number' && op.attributes == null) {
    //   inverted.retain(op.retain);
    //   return baseIndex + op.retain;
    // } else if (op.delete || typeof op.retain === 'number') {
    // 
    // So if retain has attributes, it falls through to the forEach branch!
    // In forEach: if (op.delete) -> false. else if (op.retain && op.attributes) -> true (has attrs)
    // Mutation: else if (true) -> true. SAME RESULT.
    //
    // So mutation truly has no observable effect? That seems wrong.
    // Unless... op.retain is a number like 0? No, retain(0) is filtered out.
    
    // Wait - what about retain with attributes where op.retain is the number itself?
    // op.retain = 3, op.attributes = {bold: true}
    // op.retain && op.attributes = 3 && {bold:true} = truthy -> same as true
    // No difference.
    
    // The ONLY case: op.retain is falsy (0, null, false) but typeof op.retain === 'number' is true
    // That means op.retain = 0. But retain(0) returns early in retain() method.
    // What if we construct ops directly?
    
    const delta = new Delta([{ retain: 0, attributes: { bold: true } }]);
    const base = new Delta().insert('a');
    const inverted = delta.invert(base);
    // With original: op.retain = 0, op.attributes = {bold:true}
    // typeof op.retain === 'number' && op.attributes == null -> false (has attributes)
    // op.delete || typeof op.retain === 'number' -> true (0 is number)
    // forEach: if (op.delete) -> false. else if (op.retain && op.attributes) -> 0 && ... = false -> nothing
    // Mutation: else if (true) -> retain is called! Extra retain op added.
    const expected = new Delta();
    expect(inverted).toEqual(expected);
  });
});