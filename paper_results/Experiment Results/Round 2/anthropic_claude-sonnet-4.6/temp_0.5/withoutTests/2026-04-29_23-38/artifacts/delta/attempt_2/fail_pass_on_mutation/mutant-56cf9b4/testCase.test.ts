import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta invert', () => {
  it('should not execute retain block when op.retain is truthy but op.attributes is falsy non-null, even when base has attributes', () => {
    // Construct base with attributes on the text
    const base = new Delta().insert('hello', { bold: true });
    // Manually construct a delta with retain=5 and attributes=false
    // false is falsy but NOT == null, so it bypasses the early return
    // but makes op.retain && op.attributes evaluate to false
    const delta = new Delta([{ retain: 5, attributes: false as any }]);
    const inverted = delta.invert(base);
    // Original: else if (5 && false) = false -> nothing added -> inverted is empty after chop
    // Mutated: else if (true) -> inverted.retain(5, AttributeMap.invert(false, {bold:true}))
    //          which may produce {retain:5, attributes:{bold:true}} that survives chop
    expect(inverted.ops).toEqual([]);
  });
});