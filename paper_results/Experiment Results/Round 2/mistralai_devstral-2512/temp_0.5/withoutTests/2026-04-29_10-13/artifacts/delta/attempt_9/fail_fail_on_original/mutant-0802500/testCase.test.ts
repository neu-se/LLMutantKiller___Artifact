import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta compose optimization", () => {
  it("should optimize when composing insert with retain when insert length <= retain length", () => {
    const delta1 = new Delta().insert("ab");
    const delta2 = new Delta().retain(3);
    const result = delta1.compose(delta2);
    // Original code should consume the entire insert (length 2 <= retain 3)
    // and produce just the remaining retain (3-2=1)
    // Mutated code won't recognize the insert type and won't optimize
    expect(result.ops).toEqual([
      { retain: 1 }
    ]);
  });
});