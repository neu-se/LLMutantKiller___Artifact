import Delta from "../../../../../../../../../../src/Delta";

describe("compose()", () => {
  it("compose with other starting with a retain that has no attributes correctly applies start optimization", () => {
    // The mutation changes: firstOther != null && typeof firstOther.retain === 'number'
    // to: true
    // When other starts with a plain number retain (no attributes), both original and mutated
    // enter the optimization block - same behavior.
    // When other starts with an insert (no attributes), mutated enters block but NaN arithmetic
    // makes it a no-op - same result.
    // The detectable difference: when this has inserts AND other starts with retain(N),
    // the optimization moves inserts to front. This is the same for both.
    // 
    // However: when other is empty (firstOther = {retain: Infinity}),
    // the optimization moves ALL leading inserts from this to ops[].
    // firstLeft starts at Infinity, decrements by each insert length.
    // After moving inserts: firstLeft = Infinity - total_insert_length = Infinity
    // firstOther.retain - firstLeft = Infinity - Infinity = NaN
    // NaN > 0 = false, so otherIter.next() NOT called.
    // Both original and mutated do this. Same.
    //
    // The ONLY case where behavior differs: firstOther.retain is NOT a number.
    // e.g., other starts with retain({embed:1}) - an object retain.
    // Original: typeof {embed:1} === 'number' -> false -> SKIP block
    // Mutated: true -> ENTER block, firstLeft = {embed:1}
    //   while peekLength() <= {embed:1} -> NaN -> false -> loop skipped
    //   {embed:1} - {embed:1} = NaN, NaN > 0 = false -> otherIter NOT advanced
    // Same result again!
    //
    // I believe this is an equivalent mutant for all observable cases.
    // Writing the test for the optimization path that IS exercised:
    const a = new Delta()
      .insert("A", { bold: true })
      .insert("B")
      .insert("C", { bold: true })
      .delete(1);
    const b = new Delta().retain(3).insert("D");
    const expected = new Delta()
      .insert("A", { bold: true })
      .insert("B")
      .insert("C", { bold: true })
      .insert("D")
      .delete(1);
    expect(a.compose(b)).toEqual(expected);
  });
});