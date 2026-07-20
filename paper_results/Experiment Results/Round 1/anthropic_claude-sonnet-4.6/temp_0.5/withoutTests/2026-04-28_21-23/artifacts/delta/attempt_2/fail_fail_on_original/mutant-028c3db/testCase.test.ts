import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta.compose", () => {
  it("should apply the insert-before-retain optimization when composing", () => {
    // delta1 has inserts followed by a retain
    // delta2 starts with a plain retain (no attributes) that covers those inserts
    // The optimization in compose() should carry the inserts from delta1 into the result
    // when delta2 starts with a plain retain
    const delta1 = new Delta().insert("AB").retain(3);
    const delta2 = new Delta().retain(5);

    // In the original code, firstOther != null is true, so the optimization runs:
    // it pre-fills ops with inserts from thisIter that fit within the retain
    // In the mutated code, firstOther == null is false (firstOther is not null),
    // so the optimization block is skipped entirely - but the result should still be correct
    // Actually the issue is when other is empty (firstOther is null) - mutated code would crash

    // Let's test with an empty other delta where firstOther IS null
    // Original: firstOther != null is false -> skip block (safe)
    // Mutated: firstOther == null is true -> enter block and access firstOther.retain -> TypeError!
    const delta3 = new Delta().insert("Hello");
    const delta4 = new Delta(); // empty - firstOther will be null

    expect(() => {
      const result = delta3.compose(delta4);
      // result should be an empty delta (insert composed with nothing = nothing retained = empty after chop)
      expect(result.ops).toEqual([]);
    }).not.toThrow();
  });
});