import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('invert()', () => {
  it('retain with falsy attributes does not add spurious retain ops', () => {
    // Direct construction: retain:2 with attributes:false (falsy but not null/undefined)
    // Original: else if(op.retain && op.attributes) -> 2 && false -> false -> nothing added
    // Mutated: else if(true) -> retain(1) added for each base op -> spurious retains
    const delta = new Delta([{ retain: 2, attributes: (false as any) }]);
    const base = new Delta().insert('ab');
    const inverted = delta.invert(base);
    // Original produces empty delta (no ops match any branch that adds to inverted)
    // Wait - does it? Let me trace:
    // op = {retain:2, attributes:false}
    // op.insert -> falsy -> skip
    // typeof op.retain === 'number' && op.attributes == null -> true && false -> false -> skip early return
    // op.delete || typeof op.retain === 'number' -> false || true -> true -> enter forEach
    // forEach over slice(0,2): baseOp={insert:'a'}, baseOp={insert:'b'}
    // if(op.delete) -> false
    // Original: else if(2 && false) -> false -> nothing
    // So inverted stays empty -> chop() -> empty
    expect(inverted).toEqual(new Delta());
  });
});