import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose()', () => {
  it('insert followed by compose with insert-only other delta', () => {
    // When other delta starts with insert (not retain), firstOther.retain is undefined
    // Original: false && ... = false, skip optimization
    // Mutated: (firstOther != null) = true, ENTER block
    // firstLeft = undefined, while loop: peekLength() <= undefined = false (skip)
    // firstOther.retain - firstLeft = NaN, NaN > 0 = false (skip otherIter.next)
    // So behavior should be same... need different angle
    //
    // Try: other delta is empty (firstOther = {retain: Infinity})
    // firstOther.retain = Infinity (a number), firstOther.attributes = undefined (== null)
    // Original: true && true && true = true (enter block) - same as mutated
    // Need case where firstOther != null but retain is NOT a number AND attributes == null
    // That means firstOther is an insert or delete
    // firstOther = {insert: 'X'}: retain=undefined, not a number
    // Original: true && false && ... = false (skip)
    // Mutated: true || false = true (enter block!)
    // firstLeft = undefined, while loop false, NaN > 0 false - still same behavior?
    
    // Actually test with firstOther being a delete
    const a = new Delta().insert('Hello');
    const b = new Delta().delete(3).insert('X');
    const result = a.compose(b);
    const expected = new Delta().insert('X').insert('lo');
    expect(result).toEqual(expected);
  });
});