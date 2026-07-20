import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta.compose", () => {
  it("compose preserves separate insert op boundaries when other starts with a plain retain", () => {
    // Two separate insert ops in base (constructed directly to avoid push() merging)
    const base = new Delta([{ insert: "A" }, { insert: "BC" }]);
    // other retains all 3 characters (no attributes)
    const other = new Delta().retain(3);

    const result = base.compose(other);

    // Original: firstOther != null → optimization runs, pre-loads both inserts into ops[]
    //   without going through delta.push(), preserving separate op boundaries
    //   result: [{insert:"A"}, {insert:"BC"}]
    // Mutated: firstOther == null is false for valid retain op → optimization skipped
    //   main loop processes inserts through delta.push() which merges adjacent inserts
    //   result: [{insert:"ABC"}]
    expect(result.ops).toEqual([{ insert: "A" }, { insert: "BC" }]);
  });
});