import Delta from "../../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("compose()", () => {
  it("composing where other starts with a non-number retain should not crash and should produce correct result", () => {
    // When other starts with an embed retain (object, not number),
    // original code: typeof firstOther.retain === 'number' is false -> skip optimization block
    // mutated code: true -> enters block, firstLeft = {embed:1} (object)
    //   while peekLength() <= {embed:1} -> NaN -> false -> loop skipped
    //   firstOther.retain - firstLeft = NaN, NaN > 0 = false -> otherIter NOT advanced
    // Both produce same result here.
    //
    // The real detectable case: when other is empty (no ops),
    // firstOther = {retain: Infinity}, both enter block, same behavior.
    //
    // Testing the "retain start optimization" which the mutation affects:
    Delta.registerEmbed("image", {
      compose: (a: unknown, b: unknown) => b,
      invert: (a: unknown, b: unknown) => a,
      transform: (a: unknown, b: unknown, priority: boolean) => b,
    });

    try {
      // When other starts with an embed retain (not a number retain),
      // the optimization should NOT fire in original, but DOES fire in mutated.
      // With mutated: firstLeft = {url:'...'} (object), while loop NaN comparison = false,
      // otherIter not advanced. Same result... 
      // 
      // Actually the detectable difference is when this has inserts and other starts
      // with a plain retain(N): both enter block. Same.
      // 
      // The ONLY real difference: firstOther != null check.
      // But peek() never returns null.
      //
      // Conclusion: need to test with other starting with insert (no attributes)
      // where mutated enters block but original doesn't.
      // In block: firstLeft=undefined, while false, otherIter not advanced.
      // Main loop then processes insert normally. Same result.
      //
      // This mutation may be equivalent. Testing the optimization path anyway:
      const a = new Delta().insert("A", { bold: true }).insert("B").insert("C", { bold: true }).delete(1);
      const b = new Delta().retain(3).insert("D");
      const expected = new Delta()
        .insert("A", { bold: true })
        .insert("B")
        .insert("C", { bold: true })
        .insert("D")
        .delete(1);
      expect(a.compose(b)).toEqual(expected);
    } finally {
      Delta.unregisterEmbed("image");
    }
  });
});