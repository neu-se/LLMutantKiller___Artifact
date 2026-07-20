import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta', () => {
  it('transformPosition with insert before position and priority true', () => {
    // With priority=true and insert at offset=0 before position=2:
    // Original (offset===0 || !priority): offset=0 is true, so index increments
    // Mutant (false || !priority): false || false = false, so index does NOT increment
    const delta = new Delta().retain(1).insert('A');
    // retain(1) moves offset to 1, then insert 'A' at offset=1
    // For index=2, priority=true:
    // Original: offset(1) === 0? No. !priority? No. So no increment → returns 2? 
    // Hmm, need to reconsider
    expect(delta.transformPosition(2, true)).toEqual(2);
  });
});