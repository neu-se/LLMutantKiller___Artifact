import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta compose", () => {
  it("should preserve insert op boundaries when composing with a leading retain", () => {
    const a = new Delta().insert("A").insert("B");
    const b = new Delta().retain(2).insert("C");
    const result = a.compose(b);
    // Original: ops pushed directly to array without merging, then "C" merges with "B"
    // giving [insert("A"), insert("BC")]
    // Mutated: all pushed via delta.push(), merging everything to [insert("ABC")]
    expect(result.ops).toEqual([{ insert: "A" }, { insert: "BC" }]);
  });
});