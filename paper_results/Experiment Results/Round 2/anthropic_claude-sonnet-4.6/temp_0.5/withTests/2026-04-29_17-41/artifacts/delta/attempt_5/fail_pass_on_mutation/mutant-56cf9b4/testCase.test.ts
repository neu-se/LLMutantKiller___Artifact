import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('invert()', () => {
  it('retain with attributes where op.retain is falsy due to raw op construction', () => {
    // Directly construct ops to create a retain with falsy retain value but non-null attributes
    // retain: false with attributes set - typeof false !== 'number' so won't enter forEach branch
    // 
    // Let me try the actual scenario: what makes op.retain && op.attributes differ from true?
    // Answer: when op.retain is 0 (falsy number) AND op.attributes is non-null
    // 
    // In the forEach branch condition: op.delete || typeof op.retain === 'number'
    // typeof 0 === 'number' -> true, so we enter forEach
    // op.attributes is non-null, so early return NOT taken
    // forEach runs over slice(baseIndex, baseIndex + 0) = empty slice -> no iterations!
    // So even with retain:0, forEach body never executes. Mutation has no effect.
    //
    // FINAL REALIZATION: The mutation changes else-if condition from
    // (op.retain && op.attributes) to (true)
    // The ONLY scenario where these differ:
    // op.retain is falsy (0 or undefined/null) AND op.attributes is non-null
    // But op.retain being 0 means slice is empty (no forEach iterations)
    // And op.retain being undefined/null means typeof op.retain !== 'number'
    // so we'd only be here if op.delete is set - but then if(op.delete) runs, not else-if
    //
    // THEREFORE: The mutation appears to be equivalent/unkillable through normal API.
    // BUT - what about op.retain being a number AND op.attributes being an EMPTY object {}?
    // {} is truthy, so op.retain && {} = truthy = same as true. Still equivalent.
    //
    // Wait... what if op.attributes is 0? That's not a valid AttributeMap but...
    // AttributeMap is Record<string, unknown>, so 0 wouldn't be valid.
    //
    // Let me try: retain with attributes where retain value is NaN
    // typeof NaN === 'number' -> true! NaN && op.attributes = NaN = falsy!
    // But true = truthy! THIS IS THE DIFFERENCE!
    
    const delta = new Delta([{ retain: NaN, attributes: { bold: true } }]);
    const base = new Delta().insert('a');
    // slice(0, 0+NaN) = slice(0, NaN) -> NaN < end=NaN is false, so empty slice
    // forEach never runs -> both original and mutation produce same result
    // Still no difference in observable behavior
    
    const inverted = delta.invert(base);
    expect(inverted).toEqual(new Delta());
  });
});